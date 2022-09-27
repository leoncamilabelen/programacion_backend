import mongoose from "mongoose";


export class MongoUser{
    constructor(connection, model){
            this.connection=connection 
            this.model= model
    }
    mongoConnected() {
    mongoose.connect(this.connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
    async addUser(user) {
        try {
            this.mongoConnected()
    
            await user.save()
        }
        catch (err) {
            console.log(err)
        }
    }
    async findUser(username) {
        try {
            this.mongoConnected()
            const filterUser = this.model.find({username:username})
            return filterUser
        } catch (error) {
            console.log(error)
        }
    }
}

