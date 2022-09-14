import mongoose from "mongoose"

let instanceMongo= null

export class MongoClient {
    /**
     * 
     * @param {string_connection} connection 
     * @param {schema_mongoose} model 
     */
    constructor(connection, model) {
        this.connection = connection
        this.model = model
    }
    
   static mongoConnected() {
    mongoose.connect(this.connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    async getAll() {
        try {
            const object = await this.model.find({}, { _id: 0, __v: 0 })
            return (object)
        } catch (error) {
            console.log(error)
        }

    }
    async addData(newObjectSchema) {
        try {
            await newObjectSchema.save()
        }
        catch (err) {
            console.log(err)
        }
    }
} 