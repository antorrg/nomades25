import serverTest from './helperTest/serverTest.js'
import session from 'supertest'
const agent = session(serverTest)
import * as store from './helperTest/testStore.js'
import * as midd from '../middlewares/baseMiddFunctions.js'




describe('Tests de middlewares',()=>{
    describe('Middleware "middUuid" validacion de uuid del usuario', ()=>{
        it('Deberia permitir el acceso si hay un uuid valido', async()=>{
            const id = "c1d970cf-9bb6-4848-aa76-191f905a2edd"
            const response = await agent
             .get(`/test/users/${id}`)
             .expect(200);
             expect(response.body).toEqual({ message: 'Passed middleware' })    
        })
        it('Deberia arrojar un error si no hay un uuid valido', async()=>{
            const id = "c1d970cf-9bb6-4848-aa76191f905a2edddd" //uuid invalido
            const response = await agent
             .get(`/test/users/${id}`)
             .expect(400);
             expect(response.body).toEqual('Parametros no permitidos')    
        })
    });
    describe('Middleware "middIntId", proteccion de rutas con id numericos (integer).', ()=>{
        it('Deberia permitir el acceso si hay un id valido (integer).', async()=>{
            const id = 88;
            const response = await agent
             .get(`/test/${id}`)
             .expect(200);
             expect(response.body).toEqual({ message: 'Passed middleware' })    
        })
        it('Deberia arrojar un error si no es un numero entero valido', async()=>{
            const id = "55,7"
            const response = await agent
             .get(`/test/${id}`)
             .expect(400);
             expect(response.body).toEqual('Parametros no permitidos')    
        })
    });
    describe('Middleware "loginUser", de validacion de usuario (creacion y login)', ()=>{
        it('Deberia permitir el paso si el email y el password son correctos', async()=>{
            const user = {email: 'usuarioejemplo@nose.com', password: "L1234567"}
            const response = await agent
             .post(`/test/user/create`)
             .send(user)
             .expect('Content-Type', /json/)
             .expect(200)
             expect(response.body).toEqual({ message: 'Passed middleware' })
        })
        it('Deberia arrojar un error si faltara el email', async()=>{
            const user = {password: "L1234567"}
            const response = await agent
             .post(`/test/user/create`)
             .send(user)
             .expect('Content-Type', /json/)
             .expect(400)
             expect(response.body).toEqual('Falta el email')
        })
        it('Deberia arrojar un error si el formato del email no es correcto', async()=>{
            const user = {email: 'usuarioejemplo@nosecom', password: "L1234567"}
            const response = await agent
             .post(`/test/user/create`)
             .send(user)
             .expect('Content-Type', /json/)
             .expect(400)
             expect(response.body).toEqual('Formato de email invalido')
        })
        it('Deberia arrojar un error si faltara el password', async()=>{
            const user = { email: 'usuarioejemplo@nose.com',}
            const response = await agent
             .post(`/test/user/create`)
             .send(user)
             .expect('Content-Type', /json/)
             .expect(400)
             expect(response.body).toEqual('Falta la contraseña!')
        })
        it('Deberia arrojar un error si el formato del password no es correcto', async()=>{
            const user = {email: 'usuarioejemplo@nose.com', password: "l1234567"}
            const response = await agent
             .post(`/test/user/create`)
             .send(user)
             .expect('Content-Type', /json/)
             .expect(400)
             expect(response.body).toEqual('Contraseña invalida. Esta debe tener al menos 8 caracteres y una mayuscula')
        })
    })
   
    describe('Middleware "updUserMidd" de edicion de usuario', ()=>{
        it('Deberia pasar si los elementos del body estan y son correctos', async()=>{
            const newData = {email: 'll', given_name: 'll', picture: 'll', country: 'll'}
            const id = "c1d970cf-9bb6-4848-aa76-191f905a2edd"
            const response = await agent
            .put(`/test/user/${id}`)
            .send(newData)
            .expect('Content-Type', /json/)
            .expect(200)
            expect(response.body).toEqual({ message: 'Passed middleware' })
        })
        it('Deberia arrojar un error si faltan elementos en el body', async()=>{
            const newData = {email: 'll', picture: 'll', country: 'll',}
            const id = "c1d970cf-9bb6-4848-aa76-191f905a2edd"
            const response = await agent
            .put(`/test/user/${id}`)
            .send(newData)
            .expect('Content-Type', /json/)
            .expect(400)
            expect(response.body).toEqual("Parametros faltantes: given_name" )
        })
        it('Deberia arrojar un error si el body no estuviera', async()=>{
            const newData = {}
            const id = "c1d970cf-9bb6-4848-aa76-191f905a2edd"
            const response = await agent
            .put(`/test/user/${id}`)
            .send(newData)
            .expect('Content-Type', /json/)
            .expect(400)
            expect(response.body).toEqual('Faltan elementos!!')
        })
    });
    describe('Middleware "userResetPassMidd" de reinicio de contraseña.', ()=>{
        it('Deberia pasar si el id en el body esta y es correcto', async()=>{
            const newData = {id: "c1d970cf-9bb6-4848-aa76-191f905a2edd"}
            const response = await agent
            .post('/test/reset')
            .send(newData)
            .expect('Content-Type', /json/)
            .expect(200)
            expect(response.body).toEqual({ message: 'Passed middleware' })
        })
        it('Deberia arrojar un error si el id no tuviera un formato valido.', async()=>{
            const newData = {id: "c1d970cf-9bb6-4848-aa76d191f905a2edd"}
            const response = await agent
            .post('/test/reset')
            .send(newData)
            .expect('Content-Type', /json/)
            .expect(400)
            expect(response.body).toEqual("Id invalido!" )
        })
    });
    describe('Middleware "upgradeUserMidd" de cambio de role y bloqueo de usuario.', ()=>{
        it('Deberia pasar si el id y el body estan y son correctos', async()=>{
            const newData = {role: "Usuario", enable: true}
            const id = "c1d970cf-9bb6-4848-aa76-191f905a2edd"
            const response = await agent
            .patch(`/test/upgrade/${id}`)
            .send(newData)
            .expect('Content-Type', /json/)
            .expect(200)
            expect(response.body).toEqual({ message: 'Passed middleware' })
        })
        it('Deberia arrojar un error si faltaran elementos o estos no tuvieran un formato valido.', async()=>{
            const newData = {role: "Usuario"}
            const id = "c1d970cf-9bb6-4848-aa76-191f905a2edd"
            const response = await agent
            .patch(`/test/upgrade/${id}`)
            .send(newData)
            .expect('Content-Type', /json/)
            .expect(400)
            expect(response.body).toEqual("Parametros faltantes: enable" )
        })
        it('Deberia arrojar un error si faltaran el id o este no tuviera un formato valido.', async()=>{
            const newData = {role: "Usuario", enable: true}
            const id = "c1d970cf-9bb6-4848-aa765191f905a2edd"
            const response = await agent
            .patch(`/test/upgrade/${id}`)
            .send(newData)
            .expect('Content-Type', /json/)
            .expect(400)
            expect(response.body).toEqual("Id invalido!")
        })
    });

    describe('Middleware "createProduct" de creacion de page & item (creacion inicial)', ()=>{
        it('Deberia pasar si el body contiene todos los elementos.', async()=>{
            const body = {title: 'r', landing: 'r', logo: 'r', info_header:'r', info_body: 'r', url: 'r', items: [{img:'r', text: 'r'}, {img:'s', text: 's'}, {img:'t', text: 't'}]}
            const response = await agent
             .post('/test/page')
             .send(body)
             .expect('Content-Type', /json/)
             .expect(200)
             expect(response.body).toEqual({ message: 'Passed middleware' })
        })
        it('Deberia arrojar un error si falta alguna propiedad.', async()=>{
            const body = {title: 'r',  logo: 'r', info_header:'r', info_body: 'r', url: 'r', items: [{img:'r', text: 'r'}]}
            const response = await agent
             .post('/test/page')
             .send(body)
             .expect('Content-Type', /json/)
             .expect(400)
             expect(response.body).toEqual('Parametros faltantes: landing')
        })
        it('Deberia arrojar un error si falta alguna propiedad (en items).', async()=>{
            const body = {title: 'r', landing: 'r', logo: 'r', info_header:'r', info_body: 'r', url: 'r', items: [{ text: 'r'}, {img:'s', }]}
            const response = await agent
             .post('/test/page')
             .send(body)
             .expect('Content-Type', /json/)
             .expect(400)
             expect(response.body).toEqual('Parametros faltantes en item 1: img')
        })
    }) //'Parametros faltantes: item 1: img, item 2: text'
    describe('Middleware "createItem" creacion individual de Items.', ()=>{
        it('Deberia pasar si el body contiene todos las propiedades.', async()=>{
            const body = {img:'r', text: 'r', id: 1}
            const response = await agent
             .post('/test/item')
             .send(body)
             .expect('Content-Type', /json/)
             .expect(200)
             expect(response.body).toEqual({ message: 'Passed middleware' })
        })
        it('Deberia arrojar un error si falta alguna propiedad.', async()=>{
            const body = {img:'r', id: 1}
            const response = await agent
             .post('/test/item')
             .send(body)
             .expect('Content-Type', /json/)
             .expect(400)
             expect(response.body).toEqual('Parametros faltantes: text')
        })
    })
    describe('Middleware "updateItem" actualizacion de Items.', ()=>{
        it('Deberia pasar si el body contiene todos las propiedades.', async()=>{
            const id = 1;
            const body = {img:'r', text: 'r', id: 1}
            const response = await agent
             .put(`/test/item/${id}`)
             .send(body)
             .expect('Content-Type', /json/)
             .expect(200)
             expect(response.body).toEqual({ message: 'Passed middleware' })
        })
        it('Deberia arrojar un error si falta alguna propiedad.', async()=>{
            const id = 1;
            const body = {img:'r', id: 1}
            const response = await agent
             .put(`/test/item/${id}`)
             .send(body)
             .expect('Content-Type', /json/)
             .expect(400)
             expect(response.body).toEqual('Parametros faltantes: text')
        })
        it('Deberia arrojar un error si falta el id o no tuviera un formato correcto.', async()=>{
            const id = 1.83;
            const body = {img:'r', text: 'r', id: 1}
            const response = await agent
             .put(`/test/item/${id}`)
             .send(body)
             .expect('Content-Type', /json/)
             .expect(400)
             expect(response.body).toEqual('Parametros no permitidos')
        })
    })
  
    describe('Middleware "UpdProduct" de actualizacion de page', ()=>{
   
        it('Deberia pasar si el body contiene todos los elementos.', async()=>{
            const id = 1;
            const body = {title: 'r', landing: 'r', logo: 'r', info_header:'r', info_body: 'r', url: 'r'}
            const response = await agent
             .put(`/test/page/${id}`)
             .send(body)
             .expect('Content-Type', /json/)
             .expect(200)
             expect(response.body).toEqual({ message: 'Passed middleware' })
        })
        it('Deberia arrojar un error si falta alguna propiedad.', async()=>{
            const id = 1;
            const body = {title: 'r',  logo: 'r', info_header:'r', info_body: 'r', url: 'r'}
            const response = await agent
             .put(`/test/page/${id}`)
             .send(body)
             .expect('Content-Type', /json/)
             .expect(400)
             expect(response.body).toEqual('Parametros faltantes: landing')
        })
    })
    describe('Middlewares landingCreate y landingUpdate de creacion y actualizacion de Landing.', ()=>{
        it('LandingCreate: Deberia dejar pasar si estan todos los elementos en el body.', async()=>{
            const body = {title: "Un titulo", image:"url", info_header: "str", description: "desc"}
                        const response = await agent
                         .post('/test/land')
                         .send(body)
                         .expect('Content-Type', /json/)
                         .expect(201)
                         expect(response.body).toEqual({ message: 'Passed middleware' })
        })
        it('LandingCreate: Deberia arrojar un error si falta alguno de los parametros', async()=>{
            const body = { image:"url", info_header: "str", description: "desc"}
                        const response = await agent
                         .post('/test/land')
                         .send(body)
                         .expect('Content-Type', /json/)
                         .expect(400)
             expect(response.body).toEqual('Parametros faltantes: title')
        })
        it('LandingUpdate: Deberia dejar pasar si estan todos los elementos en el body.', async()=>{
            const id = 1;
            const body = {title: "Un titulo", image:"url", info_header: "str", description: "desc", enable: true}
                        const response = await agent
                         .put(`/test/land/${id}`)
                         .send(body)
                         .expect('Content-Type', /json/)
                         .expect(200)
                         expect(response.body).toEqual({ message: 'Passed middleware' })
        })
        it('LandingUpdate: Deberia arrojar un error si falta alguno de los parametros', async()=>{
            const id= 1
            const body = { image:"url", info_header: "str", description: "desc", enable:true}
                        const response = await agent
                         .put(`/test/land/${id}`)
                         .send(body)
                         .expect('Content-Type', /json/)
                         .expect(400)
             expect(response.body).toEqual('Parametros faltantes: title')
        })
        it('LandingUpdate: Deberia arrojar un error si falta el id o su formato no es correcto', async()=>{
            const id= 1.5
            const body = { image:"url", info_header: "str", description: "desc", enable:true}
                        const response = await agent
                         .put(`/test/land/${id}`)
                         .send(body)
                         .expect('Content-Type', /json/)
                         .expect(400)
             expect(response.body).toEqual('Parametros no permitidos')
        })
    })
        
})
