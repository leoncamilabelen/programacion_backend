export class FakeClient {
    /**
     * 
     * @param {arrayFake} objetos 
     */
    constructor(objetos) {
        this.objetos=objetos
    }
    getAll() {
        return this.objetos
    }
    addData(newObject) {
        this.objetos.push(newObject)
    }
}
