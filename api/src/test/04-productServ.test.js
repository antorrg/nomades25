import prd from '../services/productServices.js'
import * as help from './helperTest/helpProducts(04).js'

/*Tests de las funciones correspondientes a Page e Item, tablas relacionadas 
en las que se presenta el producto*/

describe('Funciones de Service/ product. CRUD basico completo de ambas tablas.', ()=>{
     afterAll(()=>{
        //console.log('Finalizando todas las pruebas...')
    })
    describe('Funciones "createProduct" y "addNewItem" de creacion de producto e items', ()=>{
        it('Deberia crear un producto con items,', async()=>{
            const {title, landing, info_header, info_body, items}= help.bodyProduct;
            const response = await prd.createProduct(title, landing,  info_header, info_body, items)
            expect(response).toMatchObject(help.responseProduct)  
        })
        it('Deberia arrojar un error al intentar crear otro producto con el mismo titulo', async()=>{
            const {title, landing,  info_header, info_body,  items} = help.bodyProduct;
            try {
               await prd.createProduct(title, landing, info_header, info_body, items)
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe('Este titulo ya existe');
                expect(error.status).toBe(400);
            }
        })
        it('Deberia crear un Item', async()=>{
            const id = 1; //El id de producto para relacionar
            const img = "url";
            const text = "texto de prueba"
            const newItem = await prd.addNewItem(img, text, id)
            expect(newItem).toEqual({message: "Item creado exitosamente"})
        });
        it('Deberia arrojar un error si falta algun parametro.', async()=>{
            const id = 8; //El id de producto para relacionar
            const img = "url";
            const text = "texto de prueba"
            try {
                await prd.addNewItem(img, text, id)
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe('Ocurrio un error, objeto no encontrado');
                expect(error.status).toBe(404);
            }
        })
    })
    describe('Funciones "getProducts", "getById" y "getDetail" busqueda de productos, producto e item.', ()=>{
        describe('Funcion "getProduct"', ()=>{
            it('Deberia retornar un arreglo con las productos', async()=>{
                const response = await prd.getProduct()
                expect(response.products).toEqual(help.resGetProduct)
            })
        })
        describe('Funcion "getById"', ()=>{
            it('Deberia retornar un objeto con un producto conteniendo arreglo con los items', async()=>{
                const id = 1
                const response = await prd.getById(id)
                expect(response).toMatchObject(help.resDetailProduct)
            })
        })
        describe('Funcion "getDetail" ', ()=>{
            it('Deberia retornar un objeto con un item', async()=>{
                const id = 4
                const response = await prd.getDetail(id)
                expect(response).toMatchObject(help.responseItem)
            })
        })
    })
    describe('Funciones de actualizacion "updProduct" y "updItem".', ()=>{
        describe('Funcion updProduct.', ()=>{
            it('Deberia actualizar total o parcialmente "product".', async()=>{
                const id= 1
                const body = help.bodyUpd
                const response = await prd.updProduct(id, body)
                expect(response).toMatchObject(help.productUpdResponse)
            })
        })
        describe('Funcion updItem', ()=>{
            it('Deberia actualizar total o parcialmente "item".', async()=>{
                const id= 1
                const body = help.itemUpdate
                const response = await prd.updItem(id, body)
                expect(response).toMatchObject(help.responseItemUpdate)
            }) 
        })
    })
    xdescribe('Funcion de borrado "delItem".', ()=>{
        it('Deberia borrar un item especifico (borrado fisico)', async()=>{
            const id = 1
            const response = await prd.delItem(id)
            expect(response).toEqual({ message: 'Item borrado exitosamente' })
        })
    })
    xdescribe('Funcion de borrado "delProduct".', ()=>{
        it('Deberia borrar a product y todos sus items asociados (borrado fisico)', async()=>{
            const id = 1
            const response = await prd.delProduct(id)
            expect(response).toEqual({ message: 'Producto y sus items asociados borrados exitosamente' })
        })
    })
    
})
