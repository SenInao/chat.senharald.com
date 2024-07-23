import { useNavigate } from "react-router-dom"
import "./CreateGC.css"

export const CreateGC = () => {
  const navigate = useNavigate()

  return (
  <div className="creategc-container">
      <h1>CrateGC</h1>
      <div className="input-field">
        <div>
          <label>Name</label>
          <input type="text"/>
        </div>
        <button>Create</button>
      </div>
      <button onClick={() => navigate("/")}>Back</button>
  </div>
  )
}
