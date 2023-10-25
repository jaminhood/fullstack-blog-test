import { ImCross } from "react-icons/im"
import { useEffect, useState } from "react"
import useAppContext from "../../context/useAppContext"
import { useParams } from "react-router-dom"

const EditPost = () => {
  const { posts, editPost } = useAppContext()
  const { id } = useParams()
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState("")
  const [cats, setCats] = useState([])

  useEffect(() => {
    const post = posts.find((p) => p._id === id)

    if (post !== undefined) {
      setTitle(post.title)
      setDesc(post.post)
      setFile(post.image)
      setCats(post.categories)
    }
  }, [posts, id])

  const deleteCategory = (i) => {
    let updatedCats = [...cats]
    updatedCats.splice(i)
    setCats(updatedCats)
  }

  const addCategory = () => {
    let updatedCats = [...cats]
    updatedCats.push(cat)
    setCat("")
    setCats(updatedCats)
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    const formData = {
      id,
      title,
      categories: cats,
      post: desc,
    }
    await editPost(formData, file)
    //post upload
    // console.log(post)
  }

  return (
    <div className="container">
      <div className="create">
        <form className="form-group">
          <h1>Edit post</h1>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              value={title}
              placeholder="Enter post title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="file">Add Image</label>
            <input onChange={(e) => setFile(e.target.files[0])} type="file" />
          </div>
          <div className="form-group">
            <div>
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                placeholder="Enter post category"
                type="text"
              />
              <div onClick={addCategory} className="add-category">
                Add
              </div>
            </div>

            {/* categories */}
            <div className="form-group">
              {cats?.map((c, i) => (
                <div key={i}>
                  <p className="color">{c}</p>
                  <p onClick={() => deleteCategory(i)}>
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              rows={15}
              cols={30}
              value={desc}
              placeholder="Write post here"
            />
          </div>
          <button onClick={handleEdit}>Update</button>
        </form>
      </div>
    </div>
  )
}

export default EditPost
