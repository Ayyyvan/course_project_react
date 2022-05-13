export const NewCollectionForm = (props) => {
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Create new collection</span>
            <div className="input-field">
              <input 
                id="name" 
                type="text" 
                name="name"
                value={props.form.name}  
                onChange={props.changeHandler} />
              <label htmlFor="name">Name of Collection</label>
            </div>
            <div className="input-field">
              <input 
                id="description" 
                type="text" 
                name="description"
                value={props.form.description}  
                onChange={props.changeHandler} />
              <label htmlFor="description">Description</label>
            </div>
          </div>

          <div className="card-action">
            <button 
            className="btn yellow darken-4"
            onClick={props.createHandler}>
              Create
            </button>
          </div>
        </div>
      </div>	
    </div>
  )
}