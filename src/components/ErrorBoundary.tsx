import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

/** Catches render errors in a route so one broken page doesn't blank the whole site. */
export class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Route error:', error, info.componentStack)
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <section className="container-ina py-20 md:py-28" role="alert">
        <p className="eyebrow mb-4">Something went wrong</p>
        <h1 className="font-heading text-5xl uppercase md:text-6xl">That page hit a snag</h1>
        <span className="rule mt-5" />
        <p className="mt-6 max-w-xl text-muted md:text-lg">
          The rest of the site is fine. Reload the page, or head back to the home page.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
          <a className="btn btn-ghost" href="#/">
            Back to home
          </a>
        </div>
      </section>
    )
  }
}
