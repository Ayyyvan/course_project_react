import {useState, useCallback, useEffect} from 'react'

const loginData = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)

  const login = useCallback((jwtToken, id)=> {
    setToken(jwtToken)
    setUserId(id)

    localStorage.setItem(loginData, JSON.stringify({
      userId: id, token: jwtToken
    }))
  }, [])

  const logout = useCallback(()=> {
    setToken(null)
    setUserId(null)

    localStorage.removeItem(loginData)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(loginData))

    if (data && data.token){
      login(data.token, data.userId)
    }
    setReady(true)
  }, [login])

  return {login, logout, token, userId, ready }
}