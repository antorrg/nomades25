
# Allowing: 
## Funcion de verificacion de permiso de usuario (caso: editar perfil)

En este caso esta funcion debe implementarse de acuerdo a la app (en el caso de tener que llamar a un hook)

```javascript
const allowing =(inf1, inf2)=>{
  let result = false;
  let userId= inf1 && inf1.id;
  let editId= inf2 && inf2.id;
  if(!userId || !editId){result = false;}
  else if(userId ===editId){
    result= true;
  }else{result = false}
  return result;
}

```
