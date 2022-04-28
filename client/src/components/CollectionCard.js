import React from "react"

export const CollectionCard = ({collection}) => {
	return (
	<div className="col s12 m7">
    <h2 className="header">"{collection.name}"</h2>
			<p><b>Owner Id:</b> {collection.owner}</p>
      <p><b>Created:</b> {new Date(collection.created).toLocaleDateString()}</p>
    <div className="card horizontal">
      <div className="card-stacked">
        <div className="card-content">
					<div className="card-title">
						<p>Description: </p>
					</div>
          <p>{collection.description}</p>
        </div>
      </div>
    </div>
  </div>
	)
}