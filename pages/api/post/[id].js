import dbConnect from 'utils/dbConnect'
import Post from 'models/post'

const handler = async (req, res) => {

    await dbConnect()

    const {id} = req.query

    const question = await Post.findById(id)
        .populate('user', 'name')
        .populate('tags', 'name slug')
        .exec()

    const answers = await Post.find({parent: id})
        .populate('user', 'name')
        .exec()

    res.status(200).json({
        data: {
            ...question.toJSON(), answers
        }
    })

}

export default handler