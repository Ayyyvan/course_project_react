export const ItemCard = (props) => {
  return(
    <li key={props.item._id} className="collection-item"> 
      <div class="card horizontal">
        <div class="card-stacked">
          <div class="card-content">
            <blockquote>
              <p>{props.item.name}</p>
              <footer>— <cite>{props.item.author || 'Unknown'}</cite></footer>
            </blockquote>
            <p>Created: {new Date(props.item.created).toLocaleDateString()}</p>
          </div>
					{props.removeItemHandler && 
						<div class="card-action">
							<button onClick={()=>{props.removeItemHandler(props.item._id)}}>Delete</button>
						</div>
					}
        </div>
      </div>
    </li>
    
  )
}