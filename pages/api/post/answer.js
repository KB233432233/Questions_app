import auth from '../../../utils/auth';
import Post from '../../../models/post';

const handler = async (req, res) => {
    if (req.method !== 'POST') return res.status(400).json();

    const user = req.user.id

    const { content, question } = req.body;
    const answer = await Post.create({
        parent: question,
        content,
        user,
    });

    await Post.findByIdAndUpdate(question, {
        $inc: {
            'question.answerCount': 1
        }
    })



    res.status(201).json()
}

export default auth(handler);