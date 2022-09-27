import knex from "knex";

export class Container {
    constructor(data, table) {
        this.knex = knex(data)
        this.table = table
    }
    async droopTable(){
        await this.knex.schema.dropTableIfExists(this.table);
    }
    async createTable() {
        try {
            await this.knex.schema.createTable(this.table, (table) => {
                table.increments("id");
                table.string("title", 20).notNullable();
                table.float("price").notNullable();
                table.string("thumbnail")
            })
        } catch (error) {
            console.log(error);
        }
    }
    async createTableChat(){
        try {
            await this.knex.schema.createTable(this.table, (table) => {
                table.string("eMail").notNullable()
                table.string("date").notNullable();
                table.string("text").notNullable();
            })
        } catch (error) {
            console.log(error);
        }
    }
    async getAll(){
        try {
        const lista= await this.knex.from(this.table).select("*");
        return lista
        } catch (error) {
            console.log(error)            
        }
    }
    async addData(newObject) {
        try {
            await this.knex(this.table).insert([newObject]);
    } catch(error) {

    }
}

}