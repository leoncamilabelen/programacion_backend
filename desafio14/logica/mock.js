import { faker } from '@faker-js/faker'
faker.locale='es'

 export const generarProductosFake=(cant=5)=>{
    const arrayProductos=[]
    for (let i = 0; i < cant; i++) {
        const element = {
            id: i+1,
            title: faker.commerce.product(),
            price: faker.commerce.price(100,1000,2,'$'),
            thumbnail: faker.image.abstract(70,70,true)
        }
        arrayProductos.push(element)
    }
    return arrayProductos
}
