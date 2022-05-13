import React, {useEffect, useState} from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import { RegistrationForm } from "../components/forms/registrationForm"

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
      await request('/api/auth/register', 'POST', {...form})
    } catch(e){}
  }

  useEffect(()=>{
    document.title = 'Registration'
    message(error)
    clearError()
  }, [error, message, clearError])

  return (
    <RegistrationForm 
      changeHandler={changeHandler}
      registerHandler={registerHandler}
      loading={loading}
    />
  )
}