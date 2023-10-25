// import all dependencies
const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const multer = require(`multer`)

const {
  getAllBlog,
  addBlog,
  addBlogImg,
  editBlog,
} = require(`./controller/blog`)
// configure app to access .env
dotenv.config()

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
}

// configure app use
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith(`image`)) {
    cb(null, true)
  } else {
    cb(`Invalid Image File!`, false)
  }
}

const upload = multer({ storage, fileFilter })

// get blog
app.get(`/api/posts/get-all`, cors(corsOptions), getAllBlog)

// create blog
app.post(
  `/api/posts/add-img`,
  cors(corsOptions),
  upload.single(`image`),
  addBlogImg
)

// create blog
app.post(`/api/posts/add`, cors(corsOptions), addBlog)

// edit blog
app.post(`/api/posts/edit`, cors(corsOptions), editBlog)

// app listen
app.listen(process.env.PORT, () =>
  console.log(`App is currently running in port ${process.env.PORT}`)
)
