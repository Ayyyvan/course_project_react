import { ItemCard } from "./ItemCard"

export const ItemList = (props) => {

	return(
		<ul className="collection with-header">
			{!props.items.length && <p className="center">No Items yet</p>}
			{props.items.map(item => {
				return(
					<ItemCard item={item}/>
				)
			})}
		</ul>
	)
}