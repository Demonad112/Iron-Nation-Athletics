import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2, Copy, Mail } from 'lucide-react'
import { formspreeEndpoint, interests, mailSubject } from '../content/contact'
import { site } from '../content/site'
import {
  buildMailto,
  buildMessage,
  emptyContact,
  fieldOrder,
  validateAll,
  validateField,
  type ContactErrors,
  type ContactValues,
} from '../hooks/contactForm'
import { GlassCard } from './ui'

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
        {required ? (
          <span className="text-[var(--accent)]" aria-hidden>
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactForm() {
  const [params] = useSearchParams()
  const interestParam = params.get('interest') ?? ''
  const plan = params.get('plan') ?? ''
  const [values, setValues] = useState<ContactValues>(() => ({
    ...emptyContact,
    interest: interests.some((i) => i.value === interestParam) ? interestParam : '',
  }))
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [mailtoUrl, setMailtoUrl] = useState('')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const interestLabel = interests.find((i) => i.value === values.interest)?.label ?? ''

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const field = e.target.name as keyof ContactValues
    const next = { ...values, [field]: e.target.value }
    setValues(next)
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: validateField(field, next) }))
  }

  const onBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const field = e.target.name as keyof ContactValues
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values) }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validateAll(values)
    setErrors(found)
    const first = fieldOrder.find((f) => found[f])
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    const body = buildMessage(values, interestLabel, plan)
    setMessage(body)

    if (formspreeEndpoint) {
      setStatus('sending')
      try {
        const res = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...values, interest: interestLabel, plan, message: body }),
        })
        setStatus(res.ok ? 'sent' : 'error')
      } catch {
        setStatus('error')
      }
      return
    }

    const { url } = buildMailto(site.email, mailSubject, body)
    setMailtoUrl(url)
    setStatus('mailto')
    window.location.href = url
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  if (status === 'sent') {
    return (
      <GlassCard className="p-6 md:p-8">
        <div role="status">
          <CheckCircle2 className="text-[var(--accent)]" size={32} aria-hidden />
          <h2 className="font-heading mt-3 text-3xl uppercase">Message sent</h2>
          <p className="mt-3 text-muted">
            Thanks {values.name.trim().split(' ')[0]}. Cody will reply within one business day.
          </p>
        </div>
      </GlassCard>
    )
  }

  if (status === 'mailto') {
    return (
      <GlassCard className="p-6 md:p-8">
        <div role="status">
          <Mail className="text-[var(--accent)]" size={32} aria-hidden />
          <h2 className="font-heading mt-3 text-3xl uppercase">Check your email app</h2>
          <p className="mt-3 text-muted">
            We opened a draft addressed to {site.email}. Press send in your email app to finish. If
            nothing opened, use the buttons below.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a className="btn btn-primary" href={mailtoUrl}>
            Open email draft
          </a>
          <button type="button" className="btn btn-ghost" onClick={copy}>
            <Copy size={16} aria-hidden />
            {copied ? 'Copied' : 'Copy message'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setStatus('idle')}>
            Edit message
          </button>
        </div>
      </GlassCard>
    )
  }

  const errorCount = Object.values(errors).filter(Boolean).length
  const described = (f: keyof ContactValues, hint = false) =>
    [errors[f] ? `${f}-error` : '', hint && !errors[f] ? `${f}-hint` : '']
      .filter(Boolean)
      .join(' ') || undefined

  return (
    <GlassCard className="p-6 md:p-8">
      <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Contact form">
        {errorCount > 0 && (
          <div role="alert" className="mb-6 border border-[#ff7a6e] bg-[#ff7a6e]/10 p-4 text-sm">
            Please fix {errorCount} {errorCount === 1 ? 'field' : 'fields'} below:
            <ul className="mt-2 list-inside list-disc">
              {fieldOrder
                .filter((f) => errors[f])
                .map((f) => (
                  <li key={f}>
                    <a
                      className="underline"
                      href={`#${f}`}
                      onClick={(ev) => {
                        ev.preventDefault()
                        formRef.current?.querySelector<HTMLElement>(`[name="${f}"]`)?.focus()
                      }}
                    >
                      {errors[f]}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        )}
        {status === 'error' && (
          <div role="alert" className="mb-6 border border-[#ff7a6e] bg-[#ff7a6e]/10 p-4 text-sm">
            We could not send your message. Please try again, or email {site.email} directly.
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="name" label="Name" required error={errors.name}>
            <input
              id="name"
              name="name"
              className="field"
              autoComplete="name"
              value={values.name}
              onChange={onChange}
              onBlur={onBlur}
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={described('name')}
            />
          </Field>
          <Field id="email" label="Email" required error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              className="field"
              autoComplete="email"
              value={values.email}
              onChange={onChange}
              onBlur={onBlur}
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={described('email')}
            />
          </Field>
          <Field id="phone" label="Phone" error={errors.phone}>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="field"
              autoComplete="tel"
              value={values.phone}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={described('phone')}
            />
          </Field>
          <Field id="interest" label="I'm interested in" required error={errors.interest}>
            <select
              id="interest"
              name="interest"
              className="field"
              value={values.interest}
              onChange={onChange}
              onBlur={onBlur}
              aria-required="true"
              aria-invalid={Boolean(errors.interest)}
              aria-describedby={described('interest')}
            >
              <option value="">Choose one…</option>
              {interests.map((i) => (
                <option key={i.value} value={i.value}>
                  {i.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {plan && (
          <p className="mt-4 text-sm text-muted">
            Package selected: <span className="text-[var(--text)]">{plan}</span>
          </p>
        )}

        <div className="mt-5 grid gap-5">
          <Field id="goals" label="Your goals" required error={errors.goals}>
            <textarea
              id="goals"
              name="goals"
              rows={5}
              className="field"
              value={values.goals}
              onChange={onChange}
              onBlur={onBlur}
              aria-required="true"
              aria-invalid={Boolean(errors.goals)}
              aria-describedby={described('goals')}
            />
          </Field>
          <Field
            id="times"
            label="Preferred times"
            hint="For example: weekday mornings, Saturdays after 10."
          >
            <input
              id="times"
              name="times"
              className="field"
              value={values.times}
              onChange={onChange}
              aria-describedby={described('times', true)}
            />
          </Field>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send enquiry'}
          </button>
          <p className="text-xs text-muted">
            {formspreeEndpoint
              ? 'Your message is sent securely to Cody.'
              : 'This opens a draft in your email app.'}
          </p>
        </div>
      </form>
    </GlassCard>
  )
}
