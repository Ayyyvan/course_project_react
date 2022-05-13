import React, {useState, useContext} from "react"
import { useHttp } from "../hooks/http.hook"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { NewCollectionForm } from "../components/forms/newCollectionForm"

export const CreatePage = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [form, setForm] = useState({
    name: '', description: ''
  })

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const createHandler = async () => {
    try{
      const data = await request('/api/collection/create', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`})
      navigate(`/collection/${data.collection._id}`)
    } catch(e){}
  }

  return (
    <NewCollectionForm
      changeHandler={changeHandler}
      createHandler={createHandler}
      form={form}
      
    />
  )
}