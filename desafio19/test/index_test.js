import { describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { app } from "../server.js";


const request = supertest(app)

describe('Traer productos todos o por id', () => {
    describe("Mostrar todos los productos", () => {
        it("retornar estatus 200", async () => {
            const response = await request.get('/api/productos/:id?')
            expect(response.status).to.eql(200)
        })
        it("retornar un array mayor a 0", async () => {
            const response = await request.get('/api/productos')
            expect(response.body.length).greaterThan(0)
        })
    })
    describe("mostrar un producto por id", () => {
        it("retornar un producto", async () => {
            const response = await request.get('/api/productos/1')
            expect(response.body[0].nombre).to.eq('melon')
        });
        it("producto inexistente para id que no exista", async () => {
            const response = await request.get('/api/productos/20')
            expect(response.text).to.eq('producto inexistente')
        })
    })
})

describe("guardar producto", () => {
    it("guardar el producto enviado", async () => {
        const newProduct = { nombre: "pera", precio: 800, imagen: "imagen pera" }
        const response = await request.post('/api/productos').send(newProduct)
        expect(response.body).to.include.keys("id")
        expect(response.body.nombre).to.eq(newProduct.nombre)
        expect(response.body.precio).to.eq(newProduct.precio)
        expect(response.body.imagen).to.eq(newProduct.imagen)
    })
})


describe('modificar un producto', () => {
    it("si el producto no existe", async () => {
        const response = await request.put('/api/productos/20')
        expect(response.text).to.eq("producto inexistente")
    })
    it("modifica el producto si existe", async () => {
        const newProduct={precio:1500}
        const response = await request.put('/api/productos/4').send(newProduct)
        expect(response.body.precio).to.eq(newProduct.precio)
    })
})

describe("eliminar un producto", () => {
    it("si no existe el id", async () => {
        const response = await request.delete('/api/productos/20')
        expect(response.text).to.eq("producto inexistente")
    })
    it("elimina el producto si encuentra el id", async () => {
        const response = await request.delete("/api/productos/4")
        expect(response.body.id).to.eq("4")
    })
})

