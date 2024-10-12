import User from 'models/user'
import auth from 'utils/auth'

const handler = async (req, res) => {
    if (req.method !== 'POST') return res.status(400).json()
    const {name, email} = req.body
    try {
        await User.findByIdAndUpdate(req.user.id, {name, email})
        res.status(200).json()
    } catch (error) {
        res.status(400).json()
    }
}

export default auth(handler)