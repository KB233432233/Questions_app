import dbConnect from 'utils/dbConnect'
import cookies from 'utils/cookies'
import User from 'models/user'

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(400).json()
        return
    }
    await dbConnect()
    const {name, email, password} = req.body
    try {
        const user = await User.create({name, email, password})
        const result = user.signJwt()
        res.cookie('accessToken', result.token, {httpOnly: true})
        res.status(200).json()
    } catch (error) {
        res.status(400).json()
    }
}

export default cookies(handler)