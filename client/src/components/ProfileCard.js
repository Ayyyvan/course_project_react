import React from "react"
import { FormattedMessage } from "react-intl"

export const ProfileCard = (props) => {
  
  return(
  <div className="col s12 m7">
    <ul className="collection with-header">
      <li className="collection-header">
        <h2 className="header">
          <FormattedMessage
            id="profile"
            defaultMessage={`Profile "${props.user.username}"`}
            values={{username: props.user.username}}
          />
        </h2>
        <p><b>Id: </b> {props.user._id}</p>
        <p><b>Email: </b> {props.user.email}</p>
        <p><b>Roles: </b> {props.user.roles}</p>
      </li>
    </ul>
  </div>
  )
}