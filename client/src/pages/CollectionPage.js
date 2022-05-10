import React, { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../components/Loader"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { CollectionCard } from "../components/CollectionCard"

export const CollectionPage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [collection, setCollection] = useState(null)
  const collectionId = useParams().id

  const getCollection = useCallback(async () => {
    try{
      const fetched = await request(`/api/collection/${collectionId}`, 'GET', null, { Authorization: `Bearer ${token}`})
      setCollection(fetched)
    } catch(e){

    }
  }, [token, collectionId, request])

  useEffect( () => {
    getCollection()
  }, [getCollection])

  if(loading){
    return <Loader />
  }

  return (
    <>
      { !loading && collection && <CollectionCard collection={collection}/>}
    </>
  )
}