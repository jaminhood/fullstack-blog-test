const Blog = require(`../database/db`)
const cloudinary = require(`../helper/imageUploader`)

exports.getAllBlog = async (req, res) => {
  try {
    await Blog.find().then((blogs) => res.json(blogs))
  } catch (e) {
    console.error(e.message)
  }
}

exports.addBlogImg = async (req, res) => {
  const uniqueID = new Date().getTime()

  try {
    const img = await cloudinary.uploader.upload(req.file.path, {
      public_id: `blog_${uniqueID}`,
      width: 1000,
      height: 500,
      crop: `fill`,
    })

    res.status(200).json(img)
  } catch (e) {
    res.json(e.message)
  }
}

exports.addBlog = async (req, res) => {
  const { title, categories, image, post } = req.body

  try {
    const blog = await Blog({ title, image, categories, post })
    await blog.save()

    res.json(blog)
  } catch (e) {
    console.error(e.message)
  }
}

exports.editBlog = async (req, res) => {
  const { id, title, categories, image, post } = req.body

  try {
    await Blog.findByIdAndUpdate(id, {
      title,
      image,
      categories,
      post,
    })

    await Blog.find().then((blogs) =>
      res.status(201).json({ success: true, blogs })
    )
  } catch (e) {
    console.error(e.message)
  }
}
