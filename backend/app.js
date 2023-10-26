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

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err)

  // Set an appropriate HTTP status code (e.g., 400 for client errors)
  res
    .status(400)
    .json({ error: err.message || "An error occurred during file upload" })
})

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == `image/png` ||
    file.mimetype == `image/jpg` ||
    file.mimetype == `image/jpeg`
  ) {
    cb(null, true)
  } else {
    cb(`Invalid Image Format,. only .png,. .jpg and .jpeg allowed!.`, false)
  }
}

const maxImgSize = 50 * 1024 * 1024
const upload = multer({ storage, fileFilter, limits: { fileSize: maxImgSize } })

// get blog
app.get(`/api/posts/get-all`, cors(corsOptions), getAllBlog)

// create blog
app.post(
  `/api/posts/add-img`,
  cors(corsOptions),
  upload.single(`image`),
  async (req, res) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.send(err)
      } else if (err) {
        res.send(err)
      }
    })
    await addBlogImg(req, res)
  }
)

// create blog
app.post(`/api/posts/add`, cors(corsOptions), addBlog)

// edit blog
app.post(`/api/posts/edit`, cors(corsOptions), editBlog)

// app listen
app.listen(process.env.PORT, () =>
  console.log(`App is currently running in port ${process.env.PORT}`)
)
