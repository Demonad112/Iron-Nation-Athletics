import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Dashboard } from '../components/portal/Dashboard'
import { Locker } from '../components/portal/Locker'
import { PortalLoading } from '../components/portal/PortalLoading'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { readStore, writeStore } from '../hooks/storage'
import { LAST_CODE_KEY, PortalError, fetchClient, normaliseCode } from '../hooks/portal'
import type { PortalErrorKind } from '../hooks/portal'
import type { ClientProfile } from '../types/client'

interface Request {
  code: string
  /** 0 for the automatic restore on mount (deep link or remembered code), then 1, 2… per submit. */
  n: number
}

function clearStoredCode() {
  // writeStore swallows storage errors; an empty value means "no remembered code".
  writeStore(LAST_CODE_KEY, '')
}

function PortalInner() {
  useDocumentMeta(
    'Client Portal',
    'Demo client portal: training plan, nutrition, check-ins, progress and recovery. Sample data only.',
  )
  const [params] = useSearchParams()
  const navigate = useNavigate()

  // A ?code= deep link wins over the remembered code.
  const [startCode, setStartCode] = useState(() => {
    const fromUrl = params.get('code')
    return normaliseCode(fromUrl ?? readStore(LAST_CODE_KEY) ?? '')
  })
  const [request, setRequest] = useState<Request | null>(() =>
    startCode ? { code: startCode, n: 0 } : null,
  )
  const [client, setClient] = useState<ClientProfile | null>(null)
  const [error, setError] = useState<PortalErrorKind | null>(null)
  const [errorTick, setErrorTick] = useState(0)
  const loading = request !== null

  useEffect(() => {
    if (!request) return
    const ctrl = new AbortController()
    fetchClient(request.code, ctrl.signal)
      .then((c) => {
        writeStore(LAST_CODE_KEY, c.code)
        setClient(c)
        setError(null)
        setRequest(null)
      })
      .catch((err: unknown) => {
        if ((err as Error).name === 'AbortError') return
        if (!(err as PortalError).kind || (err as PortalError).kind === 'notfound')
          clearStoredCode()
        setError(err instanceof PortalError ? err.kind : 'network')
        setErrorTick((t) => t + 1)
        setRequest(null)
      })
    return () => ctrl.abort()
  }, [request])

  const submit = useCallback((raw: string) => {
    const code = normaliseCode(raw)
    setError(null)
    setRequest((prev) => ({ code, n: (prev?.n ?? 0) + 1 }))
  }, [])

  const signOut = () => {
    clearStoredCode()
    setClient(null)
    setError(null)
    setStartCode('')
    // Drop a ?code= deep link too, otherwise a refresh would sign straight back in.
    navigate('/portal', { replace: true })
  }

  if (client) return <Dashboard client={client} onSignOut={signOut} />
  if (loading && !error && request && request.n === 0) {
    // Automatic restore (deep link or remembered code): show the barbell bar, no form flash.
    return (
      <section className="container-ina min-h-[100svh] py-14">
        <h1 className="sr-only">Client Portal</h1>
        <PortalLoading />
      </section>
    )
  }
  return (
    <Locker
      initialCode={startCode}
      loading={loading}
      error={error}
      errorTick={errorTick}
      onSubmit={submit}
    />
  )
}

/** Keyed by ?code= so following a deep link while the portal is open loads that client. */
export default function Portal() {
  const [params] = useSearchParams()
  return <PortalInner key={params.get('code') ?? ''} />
}
