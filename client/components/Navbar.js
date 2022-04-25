import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import Cart from '../../public/images/cart.svg'

const Navbar = ({ handleClick, isLoggedIn, isAdmin, username }) => {
	console.log(isLoggedIn)
	console.log(`${username} isAdmin: ${isAdmin}`)
	const guest = () => {
		if (!isLoggedIn) {
			return (
				<div>
					<h1>GraceShopper</h1>
					<nav>
						<Link to="/products" className="Nav-Products">
							Products
						</Link>
						<div className="cart">
							<Link to="/signup">Sign Up</Link>
							<Link to="/login">Log in</Link>
							<Link to="/cart">
								<img src={Cart} />
							</Link>
						</div>
					</nav>
					<hr />
				</div>
			)
		}
		if (isLoggedIn) {
			return (
				<div>
					<h1>GraceShopper</h1>
					<nav>
						<Link to="/products" className="Nav-Products">
							Products
						</Link>
						<div className="cart">
							<button type="submit" onClick={handleClick}>
								Logout
							</button>
							<Link to="/cart">
								<img src={Cart} />
							</Link>
						</div>
					</nav>
					<hr />
				</div>
			)
		}
	}
	return <>{guest()}</>
}

/*
 ** CONTAINER
 */
const mapState = (state) => {
	return {
		isLoggedIn: !!state.auth.id,
		username: state.auth.username,
		isAdmin: state.auth.isAdmin,
	}
}

const mapDispatch = (dispatch) => {
	return {
		handleClick() {
			dispatch(logout())
		},
	}
}

export default connect(mapState, mapDispatch)(Navbar)

// {isLoggedIn ? (
//   <div>
//     {/* The navbar will show these links after you log in */}
//     <Link to="/home">Home</Link>
//     <a href="#" onClick={handleClick}>
//       Logout
//     </a>
//   </div>
// ) : (
//   <div>
//     {/* The navbar will show these links before you log in */}
//     <Link to="/login">Login</Link>
//     <Link to="/signup">Sign Up</Link>
//   </div>
// )}
