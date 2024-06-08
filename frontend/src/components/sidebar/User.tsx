import "./User.css"

interface UserProp {
  name:string
}

export const User = (props:UserProp) => {
  return (
    <div className="user-container">
      <label>{props.name}</label>
    </div>
  )
}
