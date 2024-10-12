import dbConnect from 'utils/dbConnect'
import Tag from 'models/tag'

const handler = async (req, res) => {
    await dbConnect()
    switch (req.method) {
        case 'GET':
            res.status(200).json({
                data: await Tag.find()
            })            
        break
        case 'POST':
            const { name, slug, description } = req.body
            const tag = await Tag.create({ name, slug, description })
            res.status(201).json({
                data: tag
            })
        break
        default:
            res.status(405).json()
        break
    }
}

export default handler
