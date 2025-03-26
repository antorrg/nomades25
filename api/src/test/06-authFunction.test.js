import validServer from './helperTest/validServer.js'
import request from 'supertest'
import * as store from './helperTest/testStore.js'
import { v4 as uuidv4 } from 'uuid';
import auth from '../middlewares/validation/index.js'


describe('Test de middlewares de autenticacion y autorizacion', ()=>{
    let server; // Almacena el servidor para cerrarlo después
    let agent;  // Para mantener la sesión persistente
    describe('Funciones "session" y "jsonwebtoken",, "generateToken" y "verifyToken" (a traves de controlador) ', ()=>{
      
        beforeAll((done) => {
          server = validServer.listen(4000, done); // Inicia el servidor en un puerto disponible
          agent = request.agent(server); // Inicializa supertest con la app
        });
        afterAll((done) => {
            server.close(done); // Cierra el servidor después de las pruebas
          });
        
            it('Deberia iniciar sesión y generar un token', async()=>{
            const user = { id: 556, email: 'josenomeacuerdo@nose.com', role: 9 }
            const response = await agent
            .post('/test/user/init')
            .send({user})
            .expect('Content-Type', /json/)
            .expect(200);
            expect(response.body).toHaveProperty('message', 'Passed middleware');
            expect(response.body).toHaveProperty('token');
      // Validamos que el token se haya guardado en el store
              const storedToken = store.getToken();
              expect(storedToken).toBe(response.body.token); 
        })
        it('Deberia permitir el paso si está presente el token', async()=>{
            const user = { id: 556, email: 'josenomeacuerdo@nose.com', role: 9 }
            const token = store.getToken()
            const response = await agent
             .post('/test/user')
             .send({user})
             .set('Authorization', `Bearer ${token}`)
             .expect('Content-Type', /json/)
             .expect(200);
             expect(response.body).toEqual({ message: 'Passed middleware' })       
        })
        it('Deberia negar el paso si no está presente el token o este no es valido', async()=>{
            const user = { id: 556, email: 'josenomeacuerdo@nose.com', role: 'user'}
            const response = await agent
             .post('/test/user')
             .send({user})
             .set('Authorization', `Bearer pepito`)
             .expect('Content-Type', /json/)
             .expect(401);
             expect(response.body).toEqual("Token invalido")       
        })
        it('Deberia decodificar el id y el role del usuario en un objeto: "req.UserInfo"', async()=>{
            const token = store.getToken()
            const userId = store.getUserId()
            const compare = { userId, userRole: 9}
            const response = await agent
             .get('/test/user')
             .set('Authorization', `Bearer ${token}`)
             .expect(200);
             expect(response.body).toEqual(compare)    
        })
    
    });
    describe('Middlewares de edicion de usuario que requieren autenticacion y roles de Jsonwebtoken.', ()=>{
        describe('Middleware "userVerifyPassMidd" de verificacion de password.', ()=>{
            it('Iniciando una sesión para generar el token', async ()=>{
                const user = {email: 'josenomeacuerdo@nose.com', role: 9 }
                const response = await agent
                .post('/test/user/init')
                .send({user})
                .expect('Content-Type', /json/)
                .expect(200);
                expect(response.body).toHaveProperty('message', 'Passed middleware');
                expect(response.body).toHaveProperty('token');
            })
            it('Deberia pasar si el body contiene un id y un password y si el usuario hace la consulta para el y no para otro (middleware verifyToken).', async()=>{
                const token = store.getToken()
                const id = store.getUserId()
                const body = {id, password: "L12345678"}
                    const response = await agent
                     .post('/test/user')
                     .send(body)
                     .set('Authorization', `Bearer ${token}`)
                     .expect('Content-Type', /json/)
                     .expect(200)
                     expect(response.body).toEqual({ message: 'Passed middleware' })
            })
            it('Deberia arrojar un error si el usuario no hace la peticion para su cuenta (Otra identidad)', async()=>{
                const token = store.getToken()
                const id = store.getUserId()
                const id2 = "cf9818d5-f44e-443c-9f5a-188d934233f8"
                const body = {id:id2, password: "L12345678"}
                    const response = await agent
                     .post('/test/user/midd')
                     .send(body)
                     .set('Authorization', `Bearer ${token}`)
                     .expect('Content-Type', /json/)
                     .expect(400)
                     expect(response.body).toEqual('Solo el propietario de la cuenta puede cambiar la contraseña!!')
            })
            it('Deberia arrojar un error si el password no tiene el formato esperado', async()=>{
                const token = store.getToken()
                const id = store.getUserId()
                const body = {id, password: "b12345678"}
                    const response = await agent
                     .post('/test/user/midd')
                     .send(body)
                     .set('Authorization', `Bearer ${token}`)
                     .expect('Content-Type', /json/)
                     .expect(400)
                     expect(response.body).toEqual('Contraseña invalida. Esta debe tener al menos 8 caracteres y una mayuscula')
            })
            it('Deberia arrojar un error si el id no tiene el formato adecuado (uuid v4).', async()=>{
                const token = store.getToken()
                const id = store.getUserId()
                const id2 = "cf9818d5sf44e-443c-9f5a-188d934233f8"
                const body = {id:id2, password: "L12345678"}
                    const response = await agent
                     .post('/test/user/midd')
                     .send(body)
                     .set('Authorization', `Bearer ${token}`)
                     .expect('Content-Type', /json/)
                     .expect(400)
                     expect(response.body).toEqual('Id invalido!')
            })
        });
        describe('Middleware "userChangePassMidd" de cambio de password.', ()=>{
            it('Deberia pasar si todos los parametros son correctos', async()=>{
                const token = store.getToken()
                const id = store.getUserId()
                const body = {password: "L12345678"}
                    const response = await agent
                     .put(`/test/user/${id}`)
                     .send(body)
                     .set('Authorization', `Bearer ${token}`)
                     .expect('Content-Type', /json/)
                     .expect(200)
                     expect(response.body).toEqual({ message: 'Passed middleware' })
            })
            it('Deberia arrojar un error si el usuario no hace la peticion para su cuenta (Otra identidad)', async()=>{
                const token = store.getToken()
                const id = store.getUserId()
                const id2 = "cf9818d5-f44e-443c-9f5a-188d934233f8"
                const body = {password: "L12345678"}
                    const response = await agent
                     .put(`/test/user/${id2}`)
                     .send(body)
                     .set('Authorization', `Bearer ${token}`)
                     .expect('Content-Type', /json/)
                     .expect(400)
                     expect(response.body).toEqual('Solo el propietario de la cuenta puede cambiar la contraseña!!')
            })
            it('Deberia arrojar un error si el password no tiene el formato esperado', async()=>{
                const token = store.getToken()
                const id = store.getUserId()
                const body = {password: "b12345678"}
                    const response = await agent
                     .put(`/test/user/${id}`)
                     .send(body)
                     .set('Authorization', `Bearer ${token}`)
                     .expect('Content-Type', /json/)
                     .expect(400)
                     expect(response.body).toEqual('Contraseña invalida. Esta debe tener al menos 8 caracteres y una mayuscula')
            })
            it('Deberia arrojar un error si el id no tiene el formato adecuado (uuid v4).', async()=>{
                const token = store.getToken()
                const id = store.getUserId()
                const id2 = "cf9818d5sf44e-443c-9f5a-188d934233f8"
                const body = {password: "L12345678"}
                    const response = await agent
                     .put(`/test/user/${id2}`)
                     .send(body)
                     .set('Authorization', `Bearer ${token}`)
                     .expect('Content-Type', /json/)
                     .expect(400)
                     expect(response.body).toEqual('Id invalido!')
             await agent
             .get('/test/user/logout')
             
            })
           
        });
    })
})

// it('Deberia pasar si el body contiene todos las propiedades.', async()=>{
//     const body = {img:'r', text: 'r', id: 1}
//     const response = await agent
//      .post('/test/item')
//      .send(body)
//      .expect('Content-Type', /json/)
//      .expect(200)
//      expect(response.body).toEqual({ message: 'Passed middleware' })
// })
// it('Deberia arrojar un error si falta alguna propiedad.', async()=>{
//     const body = {img:'r', id: 1}
//     const response = await agent
//      .post('/test/item')
//      .send(body)
//      .expect('Content-Type', /json/)
//      .expect(400)
//      expect(response.body).toEqual('Parametros faltantes: text')
// })