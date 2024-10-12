import dbConnect from 'utils/dbConnect'
import Post from 'models/post'

const handler = async (req, res) => {
    await dbConnect()
    const {page, sort, tag} = req.query
    const where = tag ? {tags: {$in: [tag]}} : {}

    const {items, pages} = await Post.paginate({page, sort, where})

    res.status(200).json({
        data: {
            items, pages, page
        }
    })

}

export default handler