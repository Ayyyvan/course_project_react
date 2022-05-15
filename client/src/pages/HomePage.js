import React, { useCallback, useState, useEffect } from "react"
import { Loader } from "../components/Loader"
import { useHttp } from "../hooks/http.hook"
import { CollectionsList } from "../components/CollectionsList"
import { ItemList } from "../components/ItemList"

export const HomePage = () => {
	const [items, setItems] = useState([])
  const [collections, setCollections] = useState([])
  const {loading, request} = useHttp()

  const fetchCollections = useCallback(async () => {
    try{
      const fetched = await request('/api/collection', 'GET')
      setCollections(fetched)
    } catch(e){}
  }, [request])

	const fetchItems = useCallback(async () => {
    try{
      const fetchedItems = await request('/api/item', 'GET')
      setItems(fetchedItems)
    } catch(e){}
  }, [request])

  useEffect(() => {
    fetchCollections()
		fetchItems()
  }, [fetchCollections, fetchItems])

  if(loading){
    return <Loader/>
  }

  return (
    <>
		{!loading && <ItemList items={items} fetchItems={fetchItems}/>}
    </>
  )
}