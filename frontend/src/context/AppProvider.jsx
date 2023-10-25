import axios from "axios"
import { AppContext } from "./AppContext"
import { useNavigate } from "react-router-dom"
import { URL } from "../constants"
import { useEffect, useState } from "react"

const AppProvider = (props) => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])

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
        const imgUpload = await axios.post(URL + "api/posts/add-img", data)
        formData.image = imgUpload.data.url
      } catch (err) {
        console.log(err)
      }
    }
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

  const editPost = async (formData, file) => {
    if (file) {
      const data = new FormData()
      data.append("image", file)
      try {
        const imgUpload = await axios.post(URL + "api/posts/add-img", data)
        formData.image = imgUpload.data.url
      } catch (err) {
        console.log(err)
      }
    }
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

  const providerValues = { posts, addPost, editPost }

  return (
    <AppContext.Provider value={providerValues}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppProvider
