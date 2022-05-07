import React from "react"
import { Link } from "react-router-dom"

export const CollectionsList = ({collections}) => {

	if (!collections.length){
		return <p className="center">No collection yet</p>
	}

	return (
		<table>
        <thead>
          <tr>
              <th>Name of collection</th>
              <th>Owner</th>
              <th>Open</th>
          </tr>
        </thead>

        <tbody>
					{ collections.map(collection => {
						return(
							<tr key={collection._id}>
								<td>{collection.name}</td>
								<td>{collection.owner}</td>
								<td>
									<Link to={`/collection/${collection._id}`}>Open</Link>
								</td>
							</tr>
						)
					})}
          
          
        </tbody>
      </table>
	)
}