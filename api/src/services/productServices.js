import { Product, Item, sequelize } from "../db.js";
import eh from '../utils/errorHandlers.js'
import * as cloud from "./storage.js";
import NodeCache from "node-cache";
import help from "./helpers.js";

const cache = new NodeCache({ stdTTL: 1800 }); // TTL (Time To Live) de media hora


export default {
createProduct : async (title1, landing1, info_header1, info_body1, items1 ) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const product = await Product.findOne({
            where:{title : title1

            }, transaction
        });
        if(product){eh.throwError('Este titulo ya existe', 400)};
        const newProduct = await Product.create({
            title:title1,
            landing: landing1,
            info_header:info_header1,
            info_body:info_body1,
        },{transaction});  
        const createdItems = await Promise.all(
            items1.map(async(item)=> {
                const newItem = await Item.create({
                    img : item.img,
                    text: item.text,
                },{transaction})

            await newProduct.addItem(newItem, {transaction})    
            return newItem;
            })
        );
        await transaction.commit()
        return {info: newProduct,
               items: createdItems}
    } catch (error) {
        if (transaction) { await transaction.rollback();}; throw error;}
},

addNewItem: async (img, text, id, useImg) => {
    const useImgs = help.optionImage(useImg)
    console.log(useImgs)
try {
    const productFound = await Product.findByPk(id);
    if(!productFound){eh.throwError('Ocurrio un error, objeto no encontrado', 404)};
    if(useImgs){await cloud.deleteImage(img, false)}; 
    const newItem = await Item.create({
        img:img,
        text: text,})
    await productFound.addItem(newItem)
    return { message: "Item creado exitosamente"}
} catch (error) {throw error;}
},

getProduct : async (admin) => {
    try {
        let products = cache.get('products');
        if (products &&!admin) {
                       return {products: products,
                               cache: true 
                              }
                        }// Devolver los datos en caché si existen}
        const dataFound = await Product.findAll({
            raw:true,
            where: admin ? {} :{ enable: true },
        })
        if(!dataFound){eh.throwError('Dato no hallado', 404)}
        if(dataFound.length === 0)return help.dataEmptyPage()
        const data = help.productCleaner(dataFound, false, admin)
        if(!admin){cache.set('products', data);}
        return {products: data,
                cache: false
                }
    } catch (error) {throw error;}
},
getById : async (id,admin) => {
    try {
        const data = await Product.findByPk(id,{
                include : [{
                    model: Item,
                    attributes: ['id', 'img', 'text', 'ProductId', 'enable'],
                }]
        })
        
        const dataFound = help.productCleaner(data, true, admin)//parametros: data, isObj, isAdmin
        return dataFound
    } catch (error) {
        console.error(error);
        throw error;
    }
},
getDetail : async (id) => {
    try {
        const itemFound = await Item.findByPk(id)
        if(!itemFound){eh.throwError('Dato no hallado', 404)}
        const item = help.aux(itemFound, true)
        return item;
    } catch (error) {throw error;}
},
updProduct : async (id, newData) => {
    const options = help.optionImage(newData.saver)
    const useImgs = help.optionImage(newData.useImg)
    let imageUrl= ''
    try {
        const productFound = await Product.findByPk(id);
        if(!productFound){eh.throwError('Error inesperado, dato no hallado!',404)}
        //Capturar imagen y resolver posible actualizacion
        const originalImage = productFound.landing;
        const isImageChanged = originalImage !== newData.landing;
        isImageChanged? imageUrl= originalImage: ""

        if(useImgs){await cloud.deleteImage(newData.landing, false)}; 
        const parsedData = {
            title: newData.title,
            logo: newData.logo,
            landing: newData.landing,
            info_header: newData.info_header,
            info_body: newData.info_body,
            url: newData.url,
            enable: Boolean(newData.enable),
            deleteAt: Boolean(newData.deleteAt)}

        const productUpd = await productFound.update(parsedData)

        if (isImageChanged) {
            await cloud.oldImagesHandler(imageUrl, options);
        }

        if (productUpd) {
            cache.del('products');
            }
        return productUpd;
    } catch (error) {throw error;}
},

updItem: async (id, newData)=>{
    const options = help.optionImage(newData.saver)
    const useImgs = help.optionImage(newData.useImg)
    const parsedEnable = help.optionImage(newData.enable)
    let imageUrl = ''
    try {
        const itemFound = await Item.findByPk(id);
    if(!itemFound){eh.throwError('Error inesperado, item no hallado!',404)}
    //Capturar imagen y resolver posible actualizacion
    const originalImage = itemFound.img;
    const isImageChanged = originalImage !== newData.img;
    isImageChanged? imageUrl= originalImage: ""

    if(useImgs){await cloud.deleteImage(newData.img, false)}

    const parsedData = {
        img: newData.img,
        text: newData.text,
        enable: Boolean(parsedEnable)}

    const itemUpd = await itemFound.update(parsedData)

    if (isImageChanged && imageUrl?.trim()) {
        await cloud.oldImagesHandler(imageUrl, options);
    }
    cache.del('products')
    return itemUpd
    } catch (error) {throw error;}
},

delProduct: async (id) => {
    let transaction;
    let imageUrl = ''
    let results = [];
    try {
        transaction = await sequelize.transaction();
        
        // Buscar el Producto
        const product = await Product.findByPk(id, { transaction });
        if (!product) {
            eh.throwError('Producto no hallado', 404);
        }
        (product.landing.trim())? imageUrl = product.landing : null;
        // Obtener todas las imágenes de items antes del borrado
        const itemImages = await imageItemCapture(id);
        
        // Borrar todos los Items asociados
        await Item.destroy({
            where: { ProductId: id },
            transaction
        });

        // Borrar el Producto
        await product.destroy({ transaction });
  // Después de operaciones exitosas en DB, borrar imágenes de Cloudinary

    // Borrado de imagen principal si existe
    if (imageUrl.trim()) {
        // Si la función deleteFromCloudinary devuelve una promesa, puedes esperar su resolución
        await cloud.deleteFromCloudinary(imageUrl);
      }
      
      // Borrar imágenes de items si existen
      if (itemImages.length > 0) {
        // NOTA: Usamos map directamente para crear un array plano de promesas
        const deletePromises = itemImages.map(imgUrl => cloud.deleteFromCloudinary(imgUrl));
        results = await Promise.allSettled(deletePromises);
        
        // Verificar si hubo fallos en los borrados
        const fallosEnBorrado = results.filter(result => result.status === 'rejected');
        if (fallosEnBorrado.length > 0) {
          console.error('Algunas imágenes no se pudieron borrar de Cloudinary:', fallosEnBorrado);
          // Se puede registrar el error pero seguir con la operación
        }
      }
        await transaction.commit();
        cache.del('products')
        return { 
            message: 'Producto y sus items asociados borrados exitosamente',
            imagenesBorradas: results.filter(r => r.status === 'fulfilled').length
        };

    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        throw error;
    }
},

delItem: async (id) => {
    let transaction;
    let imageUrl = ""
    try {
        transaction = await sequelize.transaction();

        // Buscar el Item
        const item = await Item.findByPk(id);
        if (!item) {
            eh.throwError('Item no hallado', 404);
        }
        imageUrl = item.img
        // Borrar el Item de la base de datos
        await item.destroy({ transaction });
      
        await transaction.commit();

        if(imageUrl.trim()){ await cloud.deleteFromCloudinary(imageUrl)}
        
        return {
            message: 'Item borrado exitosamente',
        };

    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        throw error;
    }
}
};
async function imageItemCapture (id){
    try {
        const data = await Item.findAll({
            where:{
                ProductId : id,
            },
            attributes: ['img'] 
        })
        const images = data.map(item => item.img.trim());
        if(images.length === 0){return []}
        return images;
    } catch (error) {
        throw error
    }
   
}