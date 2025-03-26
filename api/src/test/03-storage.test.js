import * as str from '../services/storage.js'
import * as help from './helperTest/helpStorage.js'



describe('Funciones de Gestion de imagenes. Guardadado y borrado en DB y en storage remoto.',()=>{
    
    // afterAll(()=>{
    //     console.log('Finalizando todas las pruebas...')
    // })
    describe('Funcion "oldImagesHandler". Guardado en DB o borrado del storage.', ()=>{
        it('Deberia guardar la url de la imagen en la DB si el segundo parametro es "true"', async()=>{
             const imageUrl = 'https://res.cloudinary.com/dt1lpgumr/image/upload/c_scale,w_auto/f_auto,q_auto/verde1.webp?_a=BAMAH2TE0'
             const result = await str.oldImagesHandler(imageUrl, true)
             expect(help.parserImages(result, true)).toEqual({ "id": 1,
                                                         "imageUrl": 'https://res.cloudinary.com/dt1lpgumr/image/upload/c_scale,w_auto/f_auto,q_auto/verde1.webp?_a=BAMAH2TE0'
                                                        })
        });
        it('Deberia arrojar un error si la url ya existiera', async()=>{
            const imageUrl = 'https://res.cloudinary.com/dt1lpgumr/image/upload/c_scale,w_auto/f_auto,q_auto/verde1.webp?_a=BAMAH2TE0'
                    try {
                      await str.oldImagesHandler(imageUrl, true)  
                    } catch (error) {
                        expect(error).toBeInstanceOf(Error)
                        expect(error.message).toBe("Esta imagen ya fue guardada")
                        expect(error.status).toBe(400)
                    }
        })
    });
    describe('Funcion "getImages". Obtener todas las imagenes guardadas.', ()=>{
        it('Deberia retornar un arreglo de imagenes', async()=>{
             const imageUrl = 'https://res.cloudinary.com/dt1lpgumr/image/upload/c_scale,w_auto/f_auto,q_auto/azul1.webp?_a=BAMAH2TE0'
             await str.oldImagesHandler(imageUrl, true)  
             const result = await str.getImages()
             expect(help.parserImages(result, false)).toEqual([
                { "id": 1,
                  "imageUrl": 'https://res.cloudinary.com/dt1lpgumr/image/upload/c_scale,w_auto/f_auto,q_auto/verde1.webp?_a=BAMAH2TE0'},
                {"id": 2,
                 "imageUrl" : 'https://res.cloudinary.com/dt1lpgumr/image/upload/c_scale,w_auto/f_auto,q_auto/azul1.webp?_a=BAMAH2TE0'
                }
                ])
        });
    });
    describe('Funcion "deleteImages". Borrado de la url de la DB. Una funcion, dos instancias: un borrado por id (true) y un borrado por coincidencia de Url (false)', ()=>{
        it('Deberia arrojar un error si el segundo parametro es true y el id de la imagen a borrar fuera incorrecto', async()=>{
            const id =4
            try {
            await str.deleteImage(id, true)
            } catch (error) {
                expect(error).toBeInstanceOf(Error)
                expect(error.status).toBe(404)
                expect(error.message).toBe('Imagen no hallada')
            }
       });
        it('Deberia borrar la url de una imagen pasando su id si el segundo parametro es "true"', async()=>{
             const id =1
             const result = await str.deleteImage(id, true)
             expect(result).toEqual("Imagen borrada exitosamente")
        });
        it('Deberia arrojar un error si el segundo parametro es false y la url de la imagen a borrar fuera incorrecta', async()=>{
            const imageUrl = 'https://res.cloudinary.com/dt1lpgumr/image/upload/c_scale,w_auto/f_auto,q_auto/verde1.webp?_a=BAMAH2TE0'
            try {
            await str.deleteImage(imageUrl, false)
            } catch (error) {
                expect(error).toBeInstanceOf(Error)
                expect(error.status).toBe(404)
                expect(error.message).toBe('Imagen no hallada')
            }
       });
        it('Deberia borrar la url de una imagen pasando su url si el segundo parametro es "false"', async()=>{
             const imageUrl = 'https://res.cloudinary.com/dt1lpgumr/image/upload/c_scale,w_auto/f_auto,q_auto/azul1.webp?_a=BAMAH2TE0'
             const result = await str.deleteImage(imageUrl, false)
             expect(result).toEqual("Imagen borrada exitosamente")
        });
    });
});