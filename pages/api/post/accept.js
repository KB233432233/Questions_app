import auth from 'utils/auth'
import Post from 'models/post'

const handler = async (req, res) => {
    const user = req.user.id
    const {question, answer} = req.body;
    const post = await Post.findOne({_id: question, parent: null})
    if (post?.user != user) return res.status(403).json()

    await Post.updateMany({parent: question}, {"answer.accepted": false})
    await Post.updateMany({parent: question, _id: answer}, {"answer.accepted": true})
    res.status(200).json()
}

export default auth(handler)