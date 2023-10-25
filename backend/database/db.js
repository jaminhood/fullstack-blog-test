const mongoose = require(`mongoose`)
const dotenv = require("dotenv")
// configure app to access .env
dotenv.config()

mongoose.connect(process.env.MONGODB_ATLAS, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

const Schema = mongoose.Schema

const BlogSchema = new Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  image: {
    type: String,
    require: true,
  },
  categories: {
    type: [String],
    require: true,
    trim: true,
  },
  post: {
    type: String,
    require: true,
  },
})

const Blog = mongoose.model(`Blog`, BlogSchema)

module.exports = Blog
