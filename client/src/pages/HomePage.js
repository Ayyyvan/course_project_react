import React, { useCallback, useState, useEffect } from "react"
import { Loader } from "../components/Loader"
import { useHttp } from "../hooks/http.hook"
import { CollectionsList } from "../components/CollectionsList"

export const HomePage = () => {
	const [collections, setCollections] = useState([])
	const {loading, request} = useHttp()

	const fetchCollections = useCallback(async () => {
		try{
			const fetched = await request('/api/collection', 'GET')
			setCollections(fetched)
		} catch(e){}
	}, [request])

	useEffect(() => {
		fetchCollections()
	}, [fetchCollections])

	if(loading){
		return <Loader/>
	}

	return (
		<>
		{!loading && <CollectionsList collections={collections}/>}
		</>
	)
}