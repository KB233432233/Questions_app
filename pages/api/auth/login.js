import dbConnect from 'utils/dbConnect'
import cookies from 'utils/cookies'
import User from 'models/user'

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(400).json()
        return
    }
    await dbConnect()
    const {email, password} = req.body

    const user = await User.findOne({email})
    if (!user?.comparePassword(password)) {
        return res.status(400).json()
    }
    const result = user.signJwt()
    res.cookie('accessToken', result.token, {httpOnly: true})
    res.status(200).json()
}

export default cookies(handler)