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

    res.json(img)
  } catch (e) {
    console.error(e.message)
  }
}

exports.addBlog = async (req, res) => {
  const { title, categories, image, post } = req.body

  const uniqueID = new Date().getTime()

  try {
    const blog = await Blog({ title, image, categories, post })
    await blog.save()

    res.json(blog)
  } catch (e) {
    console.error(e.message)
  }
}
