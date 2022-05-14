import React, { useCallback, useState, useEffect, useContext } from "react"
import { Loader } from "../components/Loader"
import { useHttp } from "../hooks/http.hook"
import { CollectionsList } from "../components/CollectionsList"
import { AuthContext } from "../context/AuthContext"
import { ProfileCard } from "../components/ProfileCard"

export const ProfilePage = () => {
  const auth = useContext(AuthContext)
  const [user, setUser] = useState(null)
  const [collections, setCollections] = useState([])
  const {loading, request} = useHttp()
  

  const fetchCollections = useCallback(async () => {
    try{
      const fetched = await request('/api/collection/my', 'GET', null, {Authorization: `Bearer ${auth.token}`})
      setCollections(fetched)
    } catch(e){}
  }, [request, auth])

  const fetchUser = useCallback(async () => {
    try{
      const fetchedUser = await request(`/api/user/${auth.userId}`, 'GET', null, {Authorization: `Bearer ${auth.token}`})
      setUser(fetchedUser)
    } catch(e){}
  }, [request, auth])

  useEffect(() => {
    fetchCollections()
    fetchUser()
  }, [fetchCollections, fetchUser])

  return(
    <div>
      {loading && <Loader/>}
      {!loading && user && <ProfileCard user={user}/>}
      {!loading && collections && <CollectionsList collections={collections}/>}
    </div>
  )
}