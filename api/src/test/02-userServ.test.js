import user from '../services/userServices.js'
import * as store from './helperTest/testStore.js'
import {User} from '../db.js'



describe('Funciones de Service/tabla de usuario. CRUD basico completo y login.',()=>{
    
    // afterAll(()=>{
    //     console.log('Finalizando todas las pruebas...')
    // })

describe('Funcion de creacion de usuario', ()=>{
    it('Deberia crear un usuario con rol basico a partir del email y el password', async()=>{
    const email = 'usuarioejemplo@internet.com'
    const password = 'L1234567';
    const newUser = await user.userCreate(email, password)
    expect(newUser).toEqual({ "id": expect.any(String),
                              "email": email,
                               "nickname": "usuarioejemplo",
                               "given_name": "",
                               "picture": expect.any(String),
                               "role": "Usuario",
                               "country": null,
                               "enable": true})
    });
    it('Deberia arrojar un error al intentar crear dos veces el mismo usuario (mismo email)', async()=>{
        const email = 'usuarioejemplo@internet.com'
        const password = 'L1234567';
       try {
           await user.userCreate(email, password);
         } catch (error) {
           expect(error).toBeInstanceOf(Error);
           expect(error.message).toBe("Este usuario ya existe");
           expect(error.status).toBe(400);
         }
    });
});
describe('Validar usuario (Login)', ()=>{
    it('Deberia responder con un objeto con user si el usuario es valido (role alfabetico)', async()=>{
         const email = 'usuarioejemplo@internet.com'
         const password = 'L1234567';
         const login = await user.userLog(email, password);
         expect(login.user).toMatchObject({
                  "id": expect.any(String),
                  "email": email,
                  "nickname": "usuarioejemplo",
                  "given_name": "",
                  "picture": expect.any(String),
                  "role": "Usuario",
                  "country": null,
                  "enable": true
            })
            store.setUserId(login.user.id)
    });
    it('Deberia arrojar un error si el password no es correcto', async()=>{
        const email = 'usuarioejemplo@internet.com'
        const password = 'L1234569';
        try {
            await user.userLog(email, password);
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Contraseña no valida");
            expect(error.status).toBe(400);
          }
    });
   
    it('El password deberia estar en un hash.', async()=>{
        const userFound = await User.findOne({where: {email: "usuarioejemplo@internet.com"}})
        const password = "L1234567";
        const hash = userFound.password
        expect(hash).not.toBe(password)
    });

    it('Deberia arrojar un error si el usuario fue bloqueado', async()=>{
        const id =  store.getUserId()
        const email = 'usuarioejemplo@internet.com'
        const password = 'L1234569';
        const newData = {email, enable:false}
        try {
            await user.userUpgrade(id, newData)
            await user.userLog(email, password);
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Usuario bloqueado!");
            expect(error.status).toBe(403);
          }
    });
});
describe('Actualizar usuario', ()=>{
    it('Deberia actualizar el email, nickname automaticamente e ingresar el givenName (nombre personal)', async()=>{
       const userId = store.getUserId()
       const newData ={
        email: "usuarionuevo@hotmail.com",
        given_name: "usuario ejemplo",
        picture: "00.png",
        country: "nocountry",
       }
       const upd = await user.userUpd(userId, newData)
       expect(upd).toMatchObject({
        "id": userId,
        "email": "usuarionuevo@hotmail.com",
        "nickname": "usuarionuevo",
        "given_name": "usuario ejemplo",
        "picture":"00.png",
        "country": "nocountry",
       })
    });
    it('Deberia actualizar el usuario, pero nunca pasar un rol a Super Admin', async()=>{
        const userId = store.getUserId()
        const newData ={
         role: "Super Admin",
         enable: true,
        }
        const upd = await user.userUpgrade(userId, newData)
        expect(upd).toMatchObject({
         "id": userId,
         "role": "Usuario",
         "enable": true,
        })
    });
    
    it('Funcion de verificacion del password del usuario (paso previo a su edicion).\n       Deberia verificar y retornar un mensaje exitoso.', async()=>{
        const id = store.getUserId()
        const password = 'L1234567';
        const verify = await user.verifyPass(id, password)
        expect(verify).toEqual({ message: "Contraseña verificada exitosamente" })
    });
    it('Deberia arrojar un error si el password no corresponde.', async()=>{
        const id = store.getUserId()
        const password = 'L123456777';
        try {
            await user.verifyPass(id, password)
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Contraseña incorrecta!");
            expect(error.status).toBe(400);
          }
    });
    it('Funcion de actualizacion de password. Deberia actualizar el password del usuario.', async()=>{
        const id = store.getUserId()
        const newPassword = 'L123456777';
        const newCredential = await user.userChangePass(id, newPassword)
        expect(newCredential).toEqual("Contraseña actualizada exitosamente")
    });
});
describe('Get de usuarios, traer a todos, buscar por ID.', ()=>{
    it('Todos los usuarios: Deberia responder con un array de usuarios. ', async()=>{
        const result = await user.getAllUsers()
        expect(result).toEqual([{
            "id": expect.any(String),
            "email": "usuarionuevo@hotmail.com",
            "nickname": "usuarionuevo",
            "given_name": "usuario ejemplo",
            "picture":"00.png",
            "role": "Usuario",
            "country": "nocountry",
            "enable": true,
        }])
    });
    it('Buscar un usuario: Deberia responder con un objeto con el usuario.', async()=>{
        const id = store.getUserId();
        const result = await user.getUsersById(id)
        expect(result).toEqual({
            "id": id,
            "email": "usuarionuevo@hotmail.com",
            "nickname": "usuarionuevo",
            "given_name": "usuario ejemplo",
            "picture":"00.png",
            "role": "Usuario",
            "country": "nocountry",
            "enable": true,
        })
    });
});
describe('Delete: Borrar usuario, borrar efectivamente (no logico).', ()=>{
    it('Deberia borrar el usuario indicado', async()=>{
        const id = store.getUserId();
        const result = await user.userDel(id)
        expect(result).toEqual({ message: "Usuario borrado exitosamente" })
    });
    it('Verifica que la base de datos esté vacía y se devuelva el parametro esperado (Usuario simbolico).', async()=>{
        const result = await user.getAllUsers()
        expect(result).toEqual([
            {
                id: false,
                email: 'No hay datos aun',
                nickname: 'No hay datos aun',
                given_name: 'No hay datos aun',
                picture: expect.any(String),
                role: 'No hay datos aun',
                country: 'No hay datos aun',
                enable: 'No hay datos aun',
            }
        ]);
    });
});
describe('Usuario SuperAdmin (llave de la app) proteccion contra cambios criticos o borrado', ()=>{
    it('El Super Admin deberia permitir edicion pero no deberia cambiar nunca el email ni poder bloquearse (enable false)', async()=>{
        const email = 'usuarioejemplo@internet.com'
        const password = 'L1234567';
        const role = 9
        const newUser = await user.userCreate(email, password, role)
        store.setUserId(newUser.id)
        const newData ={
            email: "usuarionuevo@hotmail.com",
            given_name: "usuario ejemplo",
            picture: "01.png",
            role: "Usuario",
            country: "nocountry",
            enable: false,
           }
           //const id = store.getUserId()
           const upd = await user.userUpd(newUser.id, newData)
           expect(upd).toMatchObject({
            "id": newUser.id,
            "email": "usuarioejemplo@internet.com",
            "nickname": "usuarioejemplo",
            "given_name": "usuario ejemplo",
            "picture":"01.png",
            "role": "Super Admin",
            "country": "nocountry",
            "enable": true,
           })
    });
    it('El Super Admin no deberia permitir corroborar su contraseña', async()=>{
            const id = store.getUserId()
            const password = 'L123456777';
            try {
                await user.verifyPass(id, password)
              } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe("No se puede cambiar la contraseña a este usuario. Accion no permitida")
                expect(error.status).toBe(403);
              }
    });
    it('No se deberia poder cambiar la contraseña del Super Admin', async()=>{
            const id = store.getUserId()
            const password = 'L123456777';
            try {
                await user.userChangePass(id, password)
              } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe("No se puede cambiar la contraseña a este usuario. Accion no permitida")
                expect(error.status).toBe(403);
              }
    });
    it('No se deberia poder borrar al Super Admin', async()=>{
        const id = store.getUserId();
        try {
            await user.userDel(id)
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("No se puede eliminar a este usuario")
            expect(error.status).toBe(403);
          }
    });
});
});
