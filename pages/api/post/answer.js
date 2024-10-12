import auth from 'utils/auth'
import Post from 'models/post'

const handler = async (req, res) => {

    if (req.method !== 'POST') return res.status(405).json()

    const user = req.user.id

    const {content, question} = req.body

    await Post.create({
        parent: question,
        content,
        user,
    })

    await Post.findByIdAndUpdate(question, {
        $inc: {
            'question.answersCount': 1
        }
    })

    res.status(201).json()

}

export default auth(handler)