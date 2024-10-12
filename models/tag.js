import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = new Schema({
    name: {
        type: String
    },
    slug: {
        type: String,
        unique: true
    },
    description: {
        type: String
    }
})

schema.virtual('id').get(function() {
   return this._id
})

schema.set('toJSON', {
   virtuals: true
})

export default mongoose.models?.Tag || mongoose.model('Tag', schema)