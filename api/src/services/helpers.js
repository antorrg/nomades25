import env from '../envConfig.js'
const productCleaner = (data, isObj, isAdmin)=>{
    return isObj? cleaner(data, true, isAdmin): data.map((dat)=>cleaner(dat, false, isAdmin))
}

const cleaner = (cont, bl, isAdmin)=>{
    console.log('soy el cleaner: ', isAdmin)
    const dataItems = bl? filterItem(cont.Items, isAdmin):null
     const items = bl? dataItems.map((it)=> aux(it, false)): null
    const info = {
        id:cont.id,
        title:cont.title,
        landing: cont.landing,
        logo:cont.logo,
        infoHeader: cont.info_header,
        infoBody: cont.info_body,
        url: cont.url,
        show: cont.to_show,
        enable: cont.enable,
    };
    return bl? {info, items} : info
      
    
};
const aux = (info, detailItem,)=>{
    let trunc = detailItem? info.text : truncateText(info.text, 12)
    return {
        id: info.id,
        img: info.img,
        text: trunc,
        ProductId: info.ProductId,
        enable: info.enable,
    }
};

 const truncateText = (text, wordLimit = 10)=>{
    const words = text.split(' ');    // Ejemplo de uso
    if (words.length <= wordLimit) {  //   const text = "Texto de ejemplo";
        return text; }                //   const ejemplo = truncateText(text, 12);
    const truncatedWords = words.slice(0, wordLimit); 
    return truncatedWords.join(' ') + '...'; 
}
const filterItem = (data, isAdmin)=>{
    const item = isAdmin? data : data.filter(item =>item.enable===true);
    if(item.length===0){
        return emptyItem()
    }
    return item;
}
const emptyItem = ()=>{
    return [{
        id: 0,
        img: 'Not found',
        text: 'Item borrado o bloqueado por admin.',
        ProductId: 0,
        enable: true,
    }]
}
const dataEmptyPage = ()=> {
    return [{
        id: false,
        title: 'No hay datos aun',
        landing: 'No hay datos aun',
        logo: 'No hay datos aun',
        infoHeader: 'No hay datos aun',
        infoBody: 'No hay datos aun',
        url: 'No hay datos aun',
        show: false,
        enable: false,
    }]
};
const dataEmptyLanding = ()=> {
    return {
        id: false,
        title: 'Pagina web con ejemplos ',
        infoHeader: 'Nomades web site.',
        image: 'https://img.freepik.com/fotos-premium/naturaleza-natural-paisajes-naturales_1417-70.jpg',
        description: 'Esta es una descripcion del producto mostrado hecha para exhibir el contenido de la pagina',
        enable: true,
    }
};
function userParser (info, isObj, valid) { 
    return isObj? parser(info, valid) :  info.map((dt)=> parser(dt, true))
 };
 const parser = (data, valid) => {
    const roleParsed = valid ? scope(data.role) : data.role
    return {
        id: data.id,
        email: data.email,
        nickname: data.nickname,
        given_name: data.given_name,
        picture: data.picture,
        role: roleParsed,
        country: data.country,
        enable: data.enable,
    };
 };
const scope = (role)=>{
    switch(role){
      case 0:
      return "Administrador"
      case 2 : 
      return "Moderador"
      case 9 :
      return "Super Admin"
      case 1 :
      default :
      return "Usuario"
    }
}
const revertScope = (role)=>{
    switch(role){
      case "Administrador":
      return 0;
      case "Moderador": 
      return 2;
      case "Super Admin":
      return 1
      case "Usuario":
      default :
      return 1
    }
}
const emptyUser = ()=>{
    return [{ 
        id: false,
        email: 'No hay datos aun',
        nickname: 'No hay datos aun',
        given_name: 'No hay datos aun',
        picture: env.userImg,
        role: 'No hay datos aun',
        country: 'No hay datos aun',
        enable: 'No hay datos aun',
    }]
}
const protectProtocol = (data)=>{
    return data.role === 9? true: false;
   }
const cleanerLanding = (info, isObject)=>{
    return isObject? parsed(info) : info.map((inf)=>parsed(inf))
}
const parsed = (data)=>{
    return {
        id:data.id,
        image:data.image,
        title:data.title,
        info_header:data.info_header,
        description:data.description,
        enable: data.enable
    }
}
const optionImage = (save)=>{
    if(save==='true'|| save === true){
        return true
    }else if(save==='false'|| save === false){
        return false;
    }else{
        return false;
    }
}
export default {
productCleaner,
aux,
truncateText,
dataEmptyPage,
userParser,
scope,
revertScope,
emptyUser,
protectProtocol,
dataEmptyLanding,
cleanerLanding,
optionImage,
};
 

  