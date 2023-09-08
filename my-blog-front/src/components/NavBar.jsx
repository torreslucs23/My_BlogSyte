import { Link } from "react-router-dom"
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className='navbar'>
        <h2>
            <Link to={'/'}>Blog</Link>
        </h2>
        <ul>
            <li>
                <Link to={'/'}>Home</Link>
            </li>
            <li>
                <Link to={'/allPosts'} className="new-btn">Posts</Link>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar