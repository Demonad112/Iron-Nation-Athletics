/** Barbell loading bar: plates load onto the bar. Static under prefers-reduced-motion (see CSS). */
export function PortalLoading({ label = 'Loading your plan…' }: { label?: string }) {
  return (
    <div role="status" className="container-ina flex flex-col items-center py-24 text-center">
      <div className="bb-load" aria-hidden>
        <span className="bb-plate bb-plate-1" />
        <span className="bb-plate bb-plate-2" />
        <span className="bb-bar" />
        <span className="bb-plate bb-plate-3" />
        <span className="bb-plate bb-plate-4" />
      </div>
      <p className="eyebrow mt-6">{label}</p>
    </div>
  )
}
