import { Nav, Logo, Items } from '../styles/NavStyles'
import logo from '../resources/images/logo.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
        return (
                <>
                        <div style={{ boxShadow: "0 0 20px #a5a5a57f" }}>
                                <Nav>
                                        <Logo className="logo-container">
                                                {/* <img src={logo} alt="" /> */}
                                                <h2>HobbyMart</h2>
                                        </Logo>
                                        <Items className="nav-items-container">
                                                <Link className='items' to="/">Orders</Link>
                                                <Link className='items' to="/products">Products</Link>
                                                <Link className='items' to="/quiz">Quiz</Link>
                                                {/* <Link className='items' to="/users">Users</Link> */}
                                        </Items>
                                </Nav>
                        </div>
                </>
        )
}

export default Navbar