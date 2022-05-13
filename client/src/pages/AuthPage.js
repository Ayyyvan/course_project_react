import React, {useContext, useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import { LoginForm } from "../components/forms/loginForm"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"

export const AuthPage = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const loginHandler = async () => {
    try{
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
      navigate(`/`)
    } catch(e){}
  }

  useEffect(()=>{
    message(error)
    clearError()
  }, [error, message, clearError])


  return (
    <LoginForm 
      changeHandler={changeHandler}
      loginHandler={loginHandler}
      loading={loading}
      form={form}
    />
  )
}