import React, { useContext, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { FormattedMessage } from "react-intl"
import { Context } from "../components/LanguageSwitcher"

export const Navbar = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
	const languageContext = useContext(Context)

  const logoutHandler = event => {
    event.preventDefault()
    request('/api/auth/logout', 'POST')
    auth.logout()
    navigate("/")
  }

	useEffect(()=>{
		var elems = document.querySelectorAll('select');
    window.M.FormSelect.init(elems, {});
	}, [])

  return(
    <nav>
    <div className="nav-wrapper blue-grey darken-1" style={{padding: '0 2rem'}}>
      <a href="/" className="brand-logo">aWoof</a>
					
      <ul id="nav-mobile" className="right hide-on-med-and-down">
				<li>
					<select value={languageContext.locale} onChange={languageContext.selectLang}>
						<option value="en-US">English</option>
						<option value="ru-RU">Русский</option>
					</select>
				</li>
					
        {!auth.isAuthenticated && <li><NavLink to={"/login"}>
					<FormattedMessage
						id="nav.login"
						defaultMessage="Login"
					/>
					</NavLink></li>}
        {!auth.isAuthenticated && <li><NavLink to={"/register"}>
					<FormattedMessage
						id="nav.register"
						defaultMessage="Register"
					/>
					</NavLink></li>}
        {auth.isAuthenticated && <li><NavLink to={"/profile"}>
					<FormattedMessage
						id="nav.profile"
						defaultMessage="Profile"
					/>
					</NavLink></li>}
        {auth.isAuthenticated && <li><a href="/create">
					<FormattedMessage
						id="nav.createCollection"
						defaultMessage="Create Collection"
					/>
					</a></li>}
        {auth.isAuthenticated && <li><a href="/" onClick={logoutHandler}>
					<FormattedMessage
					 id="nav.logout"
					 defaultMessage="Logout"
					/>
					</a></li>}

      </ul>
    </div>
  </nav>
  )
}