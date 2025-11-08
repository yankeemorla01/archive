export const Logo = ({ className, style }: { className?: string; style?: React.CSSProperties }) => {
  return (
    <img
      src="/logo.svg"
      alt="Onboard Digital Logo"
      className={className || "h-8 md:h-10"}
      style={{ 
        height: 'auto', 
        width: 'auto', 
        objectFit: 'contain',
        display: 'block',
        ...style
      }}
    />
  )
}
