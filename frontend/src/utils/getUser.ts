import axios from "axios"

export const getUser = async () => {
  try {
    const response = await axios.get("http://senharald.com/api/user", {
      withCredentials:true
    })

    console.log(response.data)

    if (response.data.status) {
      return response.data.user
    }

    return false

  } catch (error) {
    throw error
  }
}
