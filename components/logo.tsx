export const Logo = ({ className }: { className?: string }) => {
  return (
    <img
      src="/logo.svg"
      alt="Onboard Digital Logo"
      className={className || "h-8 md:h-10"}
      style={{ height: 'auto', width: 'auto', objectFit: 'contain' }}
    />
  )
}
