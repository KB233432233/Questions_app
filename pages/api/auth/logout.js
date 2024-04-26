import cookies from '../../../utils/cookies';

const handler = (req, res) => {
    res.cookies('accessToken', '', { maxAge: -1 })
    res.status(200).json({ success: true });
}


export default cookies(handler);