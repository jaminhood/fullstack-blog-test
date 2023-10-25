import { Link } from "react-router-dom"
import Footer from "../../components/Layout/Footer/Footer"
import Navbar from "../../components/Layout/Navbar/Navbar"
import useAppContext from "../../context/useAppContext"

const Home = () => {
  const { posts } = useAppContext()

  return (
    <div>
      <Navbar />
      <div className="posts">
        <div className="flex">
          <h1>Posts</h1>
          <Link to="/posts/create" className="add-btn">
            Add New
          </Link>
        </div>
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
      <Footer />
    </div>
  )
}

export default Home
