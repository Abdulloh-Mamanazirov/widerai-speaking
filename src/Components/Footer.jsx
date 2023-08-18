import { useLocation } from "react-router-dom"

const Footer = () => {
  let location = useLocation()
  
  return (
    <div hidden={location.pathname === '/'} className="footer">
    </div>
  )
}

export default Footer
