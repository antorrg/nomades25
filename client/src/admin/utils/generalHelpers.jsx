export const booleanState = (st)=>{
    if(st===true ||st==='true'){
      return 'Activo'
    }else if(st===false ||st==='false'){
      return 'Bloqueado'
    }else{return 'Bloqueado'}
}