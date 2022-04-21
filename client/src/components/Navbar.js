import React, { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const Navbar = () => {
	const navigate = useNavigate()
	const auth = useContext(AuthContext)

	const logoutHandler = event => {
		event.preventDefault()
		auth.logout()
		navigate("/")
	}

	return(
		<nav>
    <div class="nav-wrapper blue-grey darken-1" style={{padding: '0 2rem'}}>
      <a href="/" class="brand-logo">Project name</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
				
        {!auth.isAuthenticated && <li><NavLink to={"/login"}>login</NavLink></li>}
				{!auth.isAuthenticated && <li><NavLink to={"/register"}>register</NavLink></li>} 
				{auth.isAuthenticated && <li><a href="/" onClick={logoutHandler}>logout</a></li>}
      </ul>
    </div>
  </nav>
	)
}