import React from 'react'
import 'materialize-css'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'
import LanguageSwitcher from './components/LanguageSwitcher'

function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if(!ready){
    return <Loader/>
  }

  return (
		<LanguageSwitcher>
			<AuthContext.Provider value={{
				token, login, logout, userId, isAuthenticated
			}}>
				<Router>
					<Navbar/>
					<div className='container'>
						{routes}
					</div>	
				</Router>
			</AuthContext.Provider>
		</LanguageSwitcher>
  );
}

export default App;
