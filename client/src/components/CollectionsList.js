import React, {useContext, useEffect} from "react"
import { useHttp } from "../hooks/http.hook"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useMessage } from "../hooks/message.hook"

export const CollectionsList = (props) => {
  const {token} = useContext(AuthContext)
  const message = useMessage()
  const {request, error, clearError} = useHttp()
  
  useEffect(()=>{
    message(error)
    clearError(error)
  }, [error, message, clearError])

  if (!props.collections.length){
    return <p className="center">No collection yet</p>
  }

  const deleteHandler = async (collectionId) => {
    try{
      await request(`/api/collection/${collectionId}`, 'DELETE', null, {Authorization: `Bearer ${token}`})
      props.fetch()
    } catch(e){}
  }

  

  return (
    <table>
        <thead>
          <tr>
              <th>Name of collection</th>
              <th>Owner</th>
              <th>Open</th>
              <th>Delete</th> 
          </tr>
        </thead>

        <tbody>
          { props.collections.map(collection => {
            return(
              <tr key={collection._id}>
                <td>{collection.name}</td>
                <td>{collection.owner}</td>
                <td>
                  <Link to={`/collection/${collection._id}`}>Open</Link>
                </td>
                <td>
                  <button onClick={()=>deleteHandler(collection._id)}>Delete</button>
                </td>
              </tr>
            )
          })}
          
          
        </tbody>
      </table>
  )
}