import { Link } from "react-router-dom"
import useAppContext from "../../context/useAppContext"

const Home = () => {
  const { posts } = useAppContext()

  return (
    <div className="container">
      <div className="flex">
        <h1>Posts</h1>
        <Link to="/posts/create" className="add-btn">
          Add New
        </Link>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <div className="post-card" key={post._id}>
            <img src={post.image} alt="" className="post-img" />
            <div className="flex">
              <h4 className="post-title">{post.title}</h4>
              <Link to={`/posts/edit/${post._id}`}>Edit</Link>
            </div>
            <div className="post-cats">
              ~
              {post.categories.map((cat) => (
                <p key={cat}>{cat}</p>
              ))}
            </div>
            <p className="post-text">{post.post}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
