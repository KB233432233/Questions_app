import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

schema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

schema.methods.comparePassword = function (plain) {
    return bcrypt.compareSync(plain, this.password)
}

/**
 * Generate jwt for the user.
 */
schema.methods.signJwt = function () {
    let data = {id: this._id}
    data.token = jwt.sign(data, process.env.JWT_SECRET)
    return data
}

schema.virtual('id').get(function () {
    return this._id
})

schema.set('toJSON', {
    virtuals: true
})

export default mongoose.models.User || mongoose.model('User', schema)