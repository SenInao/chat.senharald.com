import {createContext , useState, useEffect, Dispatch, SetStateAction, ReactNode, FC} from "react";
import { getUser } from "./utils/getUser";
import User from "./ws/User"

interface contextType {
  user: User | null
  setUser: Dispatch<SetStateAction< User | null>>
}

interface UserContextProps {
  childeren: ReactNode;
}

const UserContext = createContext<contextType | undefined>(undefined)

const ContextProvider:FC<UserContextProps> = ({childeren}) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    try {
      getUser().then((userObj) => {
        if (userObj) {
          setUser(userObj)
        } else {
          setUser(null)
        }
      })
    } catch (error) {
      console.log(error)
      setUser(null)
    }
  }, [])

  return ( 
    <UserContext.Provider value={ {user, setUser} } >
      {childeren}
    </UserContext.Provider> 
  )
}

export {UserContext, ContextProvider};
