import {FormattedMessage} from "react-intl"

export const ItemCard = (props) => {
  return(
      <div className="card horizontal ">
        <div className="card-stacked modal-trigger"
					href={`#${props.item._id}`}
					onClick={()=>{
						var elems = document.querySelectorAll('.modal');
						window.M.Modal.init(elems);
					}}
				>
          <div className="card-content">

            <blockquote>
              <p>{props.item.name}</p>
              <footer>— <cite>{props.item.author || <FormattedMessage id="unknownAuthor" defaultMessage="Unknown"/>}</cite></footer>
            </blockquote>

            <p>
						<FormattedMessage id="created" defaultMessage="Created: "/> 
							{new Date(props.item.created).toLocaleDateString()}
						</p>

          </div>
					{props.removeItemHandler && 
						<div className="card-action">
							<button onClick={()=>{props.removeItemHandler(props.item._id)}}>
							<FormattedMessage id="delete.btn" defaultMessage="Delete"/> 
							</button>
						</div>
					}
        </div>
      </div>
    
  )
}