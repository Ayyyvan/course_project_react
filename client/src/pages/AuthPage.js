import React, {useContext, useEffect, useState} from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"

export const AuthPage = () => {
	const auth = useContext(AuthContext)
	const message = useMessage()
	const { loading, error, request, clearError } = useHttp()
	const [form, setForm] = useState({
		email: '', password: ''
	})

	const changeHandler = event => {
		setForm({...form, [event.target.name]: event.target.value})
	}

	const loginHandler = async () => {
		try{
			const data = await request('/api/auth/login', 'POST', {...form})
			auth.login(data.token, data.userId)
		} catch(e){}
	}

	useEffect(()=>{
		message(error)
		clearError()
	}, [error, message, clearError])


	return (
		<div className="row">
			<div className="col s6 offset-s3">
				<h1>Project Name</h1>
				<div className="card blue-grey darken-1">
					<div className="card-content white-text">
						<span className="card-title">Authorization</span>
						<div>
								<div className="input-field">
									<input 
										id="email" 
										type="email" 
										name="email" 
										value={form.email} 
										onChange={changeHandler} />
									<label htmlFor="email">Email</label>
								</div>
								<div className="input-field">
									<input 
										id="password" 
										type="password" 
										name="password" 
										value={form.password} 
										onChange={changeHandler} />
									<label htmlFor="password">Password</label>
								</div>
						</div>
					</div>
					<div className="card-action">
						<button 
							className="btn yellow darken-4" 
							style={{marginRight: 20}} 
							onClick={loginHandler} 
							disabled={loading}
						>
							Sign in
						</button>
						<a href="/register">Don't have an account? Register</a>
					</div>
      	</div>
			</div>
		</div>
	)
}