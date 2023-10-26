import axios from "axios"
import { AppContext } from "./AppContext"
import { useNavigate } from "react-router-dom"
import { URL } from "../constants"
import { useEffect, useState } from "react"
import Navbar from "../components/Layout/Navbar/Navbar"

const AppProvider = (props) => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [errorMsg, setErrorMsg] = useState(``)

  useEffect(() => {
    setTimeout(() => setErrorMsg(``), 2000)
  }, [errorMsg])

  useEffect(() => {
    const getPosts = async () => {
      await axios.get(URL + "api/posts/get-all").then((res) => {
        setPosts(res.data)
      })
    }
    getPosts()
  }, [])

  const addPost = async (formData, file) => {
    if (file) {
      const data = new FormData()
      data.append("image", file)

      try {
        await axios
          .post(URL + "api/posts/add-img", data)
          .then((res) => (formData.image = res.data.url))
          .catch((err) => {
            if (
              err.response !== undefined &&
              err.response.data.includes(`Invalid Image Format`)
            ) {
              setErrorMsg(
                `Invalid Image Format,. only .png,. .jpg and .jpeg allowed!.`
              )
            } else {
              setErrorMsg(err.message)
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
    if (formData.image !== undefined) {
      try {
        await axios
          .post(URL + "api/posts/add", formData)
          .then(({ data }) => {
            setPosts((prev) => [...prev, data])
            navigate("/")
          })
          .catch((e) => console.error(e.message))
      } catch (err) {
        console.error(err)
      }
    }
  }

  const editPost = async (formData, file) => {
    if (file) {
      const data = new FormData()
      data.append("image", file)

      try {
        await axios
          .post(URL + "api/posts/add-img", data)
          .then((res) => (formData.image = res.data.url))
          .catch((err) => {
            if (
              err.response !== undefined &&
              err.response.data.includes(`Invalid Image Format`)
            ) {
              setErrorMsg(
                `Invalid Image Format,. only .png,. .jpg and .jpeg allowed!.`
              )
            } else {
              setErrorMsg(err.message)
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
    if (formData.image !== undefined) {
      try {
        await axios
          .post(URL + "api/posts/edit", formData)
          .then(({ data }) => {
            if (data.success === true) {
              setPosts(data.blogs)
            }
          })
          .catch((e) => console.error(e.message))
          .finally(() => {
            navigate("/")
          })
      } catch (err) {
        console.error(err)
      }
    }
  }

  const providerValues = { posts, addPost, editPost, errorMsg }

  return (
    <AppContext.Provider value={providerValues}>
      <Navbar />
      {props.children}
    </AppContext.Provider>
  )
}

export default AppProvider
