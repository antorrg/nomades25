import prd from '../services/landingService.js'
import * as help from './helperTest/helpLanding(05).js'

/*Tests de las funciones correspondientes a Page e Item, tablas relacionadas 
en las que se presenta el producto*/
describe('Funciones de Service/ LandingPage. CRUD basico completo.', ()=>{
     afterAll(()=>{
        //console.log('Finalizando todas las pruebas...')
    })
    describe('Funcion "createLanding" de creacion de elemento de portada', ()=>{
        it('Deberia crear un objeto con imagen titulo y descripcion,', async()=>{
            const {title, image, info_header, description}= help.bodyLanding;
            const response = await prd.createLanding(title, image, info_header, description)
            expect(response).toMatchObject(help.responseLanding)  
        })
        it('Deberia arrojar un error al intentar crear otro producto con el mismo titulo', async()=>{
            const {title, image, info_header, description}= help.bodyLanding;
            try {
               await prd.createLanding(title, image, info_header, description)
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe('Este titulo ya existe');
                expect(error.status).toBe(400);
            }
        })
    })
    describe('Funciones "getLandings" y "getLandById" busqueda general e individual.', ()=>{
        describe('Funcion "getLandings"', ()=>{
            it('Deberia retornar un arreglo con las landing pages', async()=>{
                const response = await prd.getLandings()
                expect(response).toEqual([{
                                              "id": 1,
                                             "image": "string",
                                             "info_header": "string",
                                             "title": "string",
                                             "description": "string",
                                             "enable": true,        
                                            }])
            })
        })
        describe('Funcion "getLandById"', ()=>{
            it('Deberia retornar un objeto con una landing page', async()=>{
                const id = 1
                const response = await prd.getLandById(id)
                expect(response).toMatchObject(help.responseLanding)
            })
        })
    })
    describe('Funcion de actualizacion "updLanding".', ()=>{
            it('Deberia actualizar total o parcialmente "Landing".', async()=>{
                const id= 1
                const body = help.bodyUpd
                const response = await prd.updLanding(id, body)
                expect(response).toMatchObject(help.productUpdResponse)
            })
    
    })
    describe('Funcion de borrado "delLanding".', ()=>{
        it('Deberia borrar una landing especifica (borrado fisico)', async()=>{
            const id = 1
            const response = await prd.delLanding(id)
            expect(response).toEqual('Portada borrada exitosamente' )
        })
    })  
})
