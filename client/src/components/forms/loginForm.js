export const LoginForm = (props) => {
  return(
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
                    value={props.form.email} 
                    onChange={props.changeHandler} />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input 
                    id="password" 
                    type="password" 
                    name="password" 
                    value={props.form.password} 
                    onChange={props.changeHandler} />
                  <label htmlFor="password">Password</label>
                </div>
            </div>
          </div>
          <div className="card-action">
            <button 
              className="btn yellow darken-4" 
              style={{marginRight: 20}} 
              onClick={props.loginHandler} 
              disabled={props.loading}
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