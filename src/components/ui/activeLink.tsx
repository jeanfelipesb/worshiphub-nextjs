import { useRouter } from 'next/navigation'
import { ReactNode, MouseEvent } from 'react'
 
interface ActiveLinkProps {
    children: ReactNode
    href: string
    className: string
}

function ActiveLink({ children, href, className }: ActiveLinkProps) {
  const router = useRouter()
 
  const handleClick = (e: MouseEvent<HTMLAnchorElement>)  => {
    e.preventDefault()
    router.push(href)
  }
 
  return (
    <a href={href} onClick={handleClick} className={className}> 
      {children}
    </a>
  )
}
 
export default ActiveLink