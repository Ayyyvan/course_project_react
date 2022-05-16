import { ItemCard } from "./ItemCard"
import { FormattedMessage } from "react-intl"

export const ItemList = (props) => {

	return(
		<ul className="collection with-header">
			{!props.items.length && <p className="center"><FormattedMessage id="noItems.message" defaultMessage="No Items yet"/></p>}
			{props.items.map(item => {
				return(
					<li key={item._id}  className="collection-item">

						<ItemCard 
							item={item}	 
						/>

						<div id={item._id} className="modal">

							<div className="modal-content">
								<ItemCard 
									item={item}
								/>
							</div>

							<div className="modal-footer">
								<a href="#!" className="modal-close waves-effect waves-green btn-flat">
									<FormattedMessage id="nice.message" defaultValue="Nice"/>
								</a>
							</div>

						</div>

					</li>
					
				)
			})}
		</ul>
	)
}