import React, {useEffect, useState} from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"

export const RegisterPage = () => {
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
    username: '', email: '', password: ''
  })

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try{
      const data = await request('/api/auth/register', 'POST', {...form})
    } catch(e){}
  }

  useEffect(()=>{
    message(error)
    clearError()
  }, [error, message, clearError])

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Project Name</h1>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Registration</span>
            <div>
              <div className="input-field">
                <input 
                  id="username" 
                  type="text" 
                  name="username"  
                  onChange={changeHandler}/>
                <label htmlFor="username">Username</label>
              </div>
              <div className="input-field">
                <input 
                  id="email" 
                  type="email" 
                  name="email" 
                  className="validate" 
                  onChange={changeHandler}/>
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input 
                  id="password" 
                  type="password" 
                  name="password" 
                  className="validate" 
                  onChange={changeHandler}/>
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button 
              className="btn yellow darken-4" 
              style={{marginRight: 20}} 
              onClick={registerHandler} 
              disabled={loading}
            >
              Registrate
            </button>
            <a href="/login" disabled={loading}>Already have an account?</a>
          </div>
        </div>
      </div>
    </div>
  )
}