import help from '../services/helpers.js'
import * as mock from './helperTest/helpdata(05).js'

/* Tenemos en la funcion homeCleaner tres escenarios diferentes:
-En el primero necesitamos solamente la informacion de la landing page
esta esta formada por un arreglo de objetos en los que necesitamos solo a info,
-En el segundo estamos en el detalle de una page: necesitamos un objeto con la info de la 
page, pero del campo items la imagen con los textos truncados 
-En el tercero estamos en el detalle de cada item adonde necesitamos la info de item pero 
con el texto completo.*/

describe('Funcion "productCleaner" prueba de todas las instancias', ()=>{
    it('Deberia retornar un array con 3 objetos con contenido parseado.', ()=>{
        const info = help.productCleaner(mock.pages, false)
        expect(info).toEqual(mock.parsedInfo)
    });
    it('Deberia retornar un objeto parseado del mismo modo, ademas de los items con el texto cortado (10 palabras).', ()=>{
        const info = help.productCleaner(mock.page, true)
        expect(info).toEqual(mock.parsedDetail)
    })
});
describe('Prueba de funcion "aux" (ya probada en productCleaner filtrando los Items)', ()=>{
    it('Prueba restante de aux entregando texto completo para Item', ()=>{
        const info = help.aux(mock.item, true)
        expect(info).toEqual(mock.parsedItem)
    })
})
describe('Funcion userParser (usuario parseado, funcion adaptada)', ()=>{
    it('Deberia retornar un arreglo de usuarios sin password visible y el role en un string', ()=>{
        const info = help.userParser(mock.users, false)
        expect(info).toEqual(mock.parsedUsers)
    })
    it('Deberia retornar el usuario sin password visible y el role en un string', ()=>{
        const info = help.userParser(mock.user, true)
        expect(info).toEqual(mock.parsedUser)
    })
})

