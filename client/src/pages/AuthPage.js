import React, {useState} from "react"

export const AuthPage = () => {
	const [form, setForm] = useState({
		email: '', password: ''
	})

	const changeHandler = event => {//будет менять данные в форме(которая отправляется в запросе)
		setForm({...form, [event.target.name]: event.target.value})
	}


	return (
		<div className="row">
			<div className="col s6 offset-s3">
				<h1>Project Name</h1>
				<div className="card blue-grey darken-1">
					<div className="card-content white-text">
						<span className="card-title">Authorization</span>
						<div>
								<div className="input-field">
									<input id="email" type="email" className="validate" onChange={changeHandler} />
									<label htmlFor="email">Email</label>
								</div>
								<div className="input-field">
									<input id="password" type="password" className="validate" onChange={changeHandler} />
									<label htmlFor="password">Password</label>
								</div>
						</div>
					</div>
					<div className="card-action">
						<button className="btn yellow darken-4" style={{marginRight: 20}}>Sign in</button>
						<a href="/register">Don't have an account? Register</a>
					</div>
      	</div>
			</div>
		</div>
	)
}