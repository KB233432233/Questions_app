import mongoose from 'mongoose'

const {MONGODB_URI} = process.env

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = {conn: null, prmoise: null}
}

async function dbConnect() {
    if (cached.conn) return cached.conn
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
        bufferMaxEntries: 0,
        useFindAndModify: false,
        useCreateIndex: true,
    }
    cached.prmoise = mongoose.connect(MONGODB_URI, opts)
    cached.conn = await cached.prmoise
    return cached.conn
}

export default dbConnect