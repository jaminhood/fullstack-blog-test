import { ImCross } from "react-icons/im"
import { useState } from "react"
import useAppContext from "../../context/useAppContext"

const CreatePost = () => {
  const { addPost, errorMsg } = useAppContext()
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState("")
  const [cats, setCats] = useState([])

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

  const handleCreate = async (e) => {
    e.preventDefault()
    const formData = {
      title,
      categories: cats,
      post: desc,
    }
    await addPost(formData, file)
  }

  return (
    <div className="container">
      <div className="create">
        <form className="form-group">
          <h1>Write a post</h1>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
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
              placeholder="Write post here"
            />
          </div>
          {errorMsg !== `` && <p className="error-msg">{errorMsg}</p>}
          <button onClick={handleCreate}>Create</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
