import { NavLink } from 'react-router'
const NavSidebar = ({children, ...props}) => {
  return (
    <NavLink
        {...props}
        className={({ isActive }) =>
        `flex items-center gap-2 ${isActive ? 'text-primary' : 'text-foreground'}`
        }
    >
        {children}
    </NavLink>
  )
}

export default NavSidebar