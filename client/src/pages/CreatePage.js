import React, {useState, useContext} from "react"
import { useHttp } from "../hooks/http.hook"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export const CreatePage = () => {
	const navigate = useNavigate()
	const auth = useContext(AuthContext)
	const { request } = useHttp()
	const [form, setForm] = useState({
		name: '', description: ''
	})

	const changeHandler = event => {
		setForm({...form, [event.target.name]: event.target.value})
	}

	const createHandler = async () => {
		try{
			const data = await request('/api/collection/create', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`})
			navigate(`/collection/${data.collection._id}`)
		} catch(e){}
	}

	return (
		<div className="row">
			<div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
				<div class="card blue-grey darken-1">
					<div class="card-content white-text">
						<span class="card-title">Create new collection</span>
						<div className="input-field">
							<input 
								id="name" 
								type="text" 
								name="name"
								value={form.name}  
								onChange={changeHandler} />
							<label htmlFor="name">Name of Collection</label>
						</div>
						<div className="input-field">
							<input 
								id="description" 
								type="text" 
								name="description"
								value={form.description}  
								onChange={changeHandler} />
							<label htmlFor="description">Description</label>
						</div>
					</div>

					<div className="card-action">
						<button 
						className="btn yellow darken-4"
						onClick={createHandler}>
							Create
						</button>
					</div>
				</div>
			</div>	
		</div>
	)
}