import {FormattedMessage} from "react-intl"
export const RegistrationForm = (props) => {
  
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
						<FormattedMessage id="registration" defaultMessage="Registration"/>
						</span>
            <div>
              <div className="input-field">
                <input 
                  id="username" 
                  type="text" 
                  name="username"  
                  onChange={props.changeHandler}/>
                <label htmlFor="username">
								<FormattedMessage id="username" defaultMessage="Username"/>
								</label>
              </div>
              <div className="input-field">
                <input 
                  id="email" 
                  type="email" 
                  name="email" 
                  className="validate" 
                  onChange={props.changeHandler}/>
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input 
                  id="password" 
                  type="password" 
                  name="password" 
                  className="validate" 
                  onChange={props.changeHandler}/>
                <label htmlFor="password">
								<FormattedMessage id="password" defaultMessage="Password"/>
								</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button 
              className="btn yellow darken-4" 
              style={{marginRight: 20}} 
              onClick={props.registerHandler} 
              disabled={props.loading}
            >
              <FormattedMessage id="registrate.btn" defaultMessage="Registrate"/>
            </button>
            <a href="/login" disabled={props.loading}>
							<FormattedMessage id="alreadyHaveAcc" defaultMessage="Already have an account?"/>
						</a>
          </div>
        </div>
      </div>
    </div>
  )
}