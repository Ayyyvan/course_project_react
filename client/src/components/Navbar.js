import React, { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"

export const Navbar = () => {
	const navigate = useNavigate()
	const auth = useContext(AuthContext)
	const {request} = useHttp()

	const logoutHandler = event => {
		event.preventDefault()
		request('/api/auth/logout', 'POST')
		auth.logout()
		navigate("/")
	}

	return(
		<nav>
    <div className="nav-wrapper blue-grey darken-1" style={{padding: '0 2rem'}}>
      <a href="/" className="brand-logo">Project name</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
				
        {!auth.isAuthenticated && <li><NavLink to={"/login"}>login</NavLink></li>}
				{!auth.isAuthenticated && <li><NavLink to={"/register"}>register</NavLink></li>}
				{auth.isAuthenticated && <li><a href="/create">Create</a></li>}
				{auth.isAuthenticated && <li><a href="/" onClick={logoutHandler}>logout</a></li>}

      </ul>
    </div>
  </nav>
	)
}