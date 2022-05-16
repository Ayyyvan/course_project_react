import React, {useContext, useEffect} from "react"
import { useHttp } from "../hooks/http.hook"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useMessage } from "../hooks/message.hook"
import {FormattedMessage} from "react-intl"

export const CollectionsList = (props) => {
  const {token} = useContext(AuthContext)
  const message = useMessage()
  const {request, error, clearError} = useHttp()
  
  useEffect(()=>{
    message(error)
    clearError(error)
  }, [error, message, clearError])

  if (!props.collections.length){
    return <p className="center"><FormattedMessage id="noCollections.message" defaultMessage="No Collection yet"/></p>
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
              <th><FormattedMessage id="nameOfCollection" defaultMessage="Name of collection"/></th>
              <th><FormattedMessage id="collectionOwner" defaultMessage="Owner"/></th>
              <th><FormattedMessage id="open.btn" defaultMessage="Open"/></th>
              <th><FormattedMessage id="delete.btn" defaultMessage="Delete"/></th> 
          </tr>
        </thead>

        <tbody>
          { props.collections.map(collection => {
            return(
              <tr key={collection._id}>
                <td>{collection.name}</td>
                <td>{collection.owner}</td>
                <td>
                  <Link to={`/collection/${collection._id}`}>
										<FormattedMessage id="open.btn" defaultMessage="Open"/>
									</Link>
                </td>
                <td>
                  <button onClick={()=>deleteHandler(collection._id)}>
										<FormattedMessage id="delete.btn" defaultMessage="Delete"/>
									</button>
                </td>
              </tr>
            )
          })}
          
          
        </tbody>
      </table>
  )
}