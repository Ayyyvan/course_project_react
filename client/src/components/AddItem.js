import React, {useState, useContext} from "react"
import { useHttp } from "../hooks/http.hook"
import { AuthContext } from "../context/AuthContext"
import { useNavigate, useParams } from "react-router-dom"
import { FormattedMessage } from "react-intl"

export const AddItem = () => {
  const params = useParams()
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [form, setForm] = useState({
    name: '', collectionId: params.id, author: '', tags: []
  })

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const createHandler = async () => {
    try{
      const data = await request('/api/item/create', 'POST', {item: {...form}}, {Authorization: `Bearer ${auth.token}`})
      navigate(`/collection/${data.updatedCollection._id}`)
    } catch(e){}
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
            <FormattedMessage id="addItem.btn" defaultMessage="Add item"/>
            </span>

            <div className="input-field">
              <input 
                id="name" 
                type="text" 
                name="name"
                value={form.name}  
                onChange={changeHandler} />
              <label htmlFor="name">
                <FormattedMessage id="itemName" defaultMessage="Name of Item"/>
              </label>
            </div>

            <div className="input-field">
              <input 
                id="author" 
                type="text" 
                name="author"
                value={form.author}  
                onChange={changeHandler} />
              <label htmlFor="author">
              <FormattedMessage id="author" defaultMessage="Author"/>
              </label>
            </div>

          </div>

          <div className="card-action">
            <button 
            className="btn yellow darken-4"
            onClick={createHandler}>
             <FormattedMessage id="addItem.btn" defaultMessage="Add Item"/>
            </button>
          </div>
        </div>
      </div>	
    </div>
  )

}
