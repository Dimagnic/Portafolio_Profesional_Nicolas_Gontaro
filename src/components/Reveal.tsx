import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: 0 | 1 | 2 | 3 | 4
  as?: 'div' | 'p' | 'h2'
  style?: CSSProperties
}

export default function Reveal({ children, className = '', delay = 0, as = 'div', style }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const Tag = as as 'div'
  const cls = `reveal ${delay ? `reveal-delay-${delay}` : ''} ${visible ? 'visible' : ''} ${className}`.trim()
  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={cls} style={style}>
      {children}
    </Tag>
  )
}
