import {Link} from 'react-router-dom'
import './index.css'

const Headers = () => (
  <div className="logo-container">
    <Link to="/">
      <img
        className="logo"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
      />
    </Link>
  </div>
)

export default Headers
