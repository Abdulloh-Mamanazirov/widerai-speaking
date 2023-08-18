import { useLocation } from "react-router-dom"

const Nav = () => {
  let location = useLocation()
  
  return (
    <div hidden={location.pathname === '/'} className="nav">
      <img width={300} src="/white-logo.svg" alt="" />
    </div>
  )
}

export default Nav
