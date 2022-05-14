import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { ItemCard } from "./ItemCard"


export const CollectionCard = (props) => {
  const navigate = useNavigate()
  const {token} = useContext(AuthContext)
  const {loading, request} = useHttp()
  

  const deleteHandler = async (collectionId) => {
    try{
      await request(`/api/collection/${collectionId}`, 'DELETE', null, {Authorization: `Bearer ${token}`})
      navigate('/')
    } catch(e){}
  }

  const removeItemHandler = async (itemId) => {
    try{
      await request(`/api/item/${itemId}`, 'DELETE', {collection: props.collection})
      props.getCollection()
    } catch(e){}
  }

  return (
  <div className="col s12 m7">
    <ul className="collection with-header">
      <li className="collection-header">
        <h2 className="header">"{props.collection.name}"</h2>
          <p><b>Owner: </b> {props.collection.owner}</p>
          <p><b>Created:</b> {new Date(props.collection.created).toLocaleDateString()}</p>
          <p><b>Description: </b> {props.collection.description}</p>
        <button 
          onClick={()=>document.location =`/collection/${props.collection._id}/add`}
          disabled={loading}
        >Add item
        </button>
        <button 
          onClick={()=>{deleteHandler(props.collection._id)}}
          disabled={loading}
        >Delete Collection
        </button>
      </li>
        {props.items.map(item => {
          return <ItemCard 
          item={item}
          removeItemHandler={removeItemHandler}
          />
        })}
    </ul>
  </div>
  )
}