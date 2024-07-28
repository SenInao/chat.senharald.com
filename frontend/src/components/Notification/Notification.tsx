import "./Notification.css"

interface Props {
  size: number
  notifications: number
}

const NotificationComponent = ({size, notifications}:Props) => {
  if (!notifications) {
    return <div style={{display:"none"}}></div>
  }
  return (
    <div className="Notification" style={{width: size, height: size}}>
      {notifications}
    </div>
  )
}

export default NotificationComponent
