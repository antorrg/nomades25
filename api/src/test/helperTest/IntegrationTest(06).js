 const userCreated = 
 {  
    "id": expect.any(String),
    "email": "josenomeacuerdo@hotmail.com",
     "nickname": expect.any(String),
     "givenName": "",
     "image": expect.any(String),
     "role": 1,
     "country": null,
     "enable": true
    }
const userLogged = 
{
    "user": {
      "id": expect.any(String),
      "email": "josenomeacuerdo@hotmail.com",
      "nickname": expect.any(String),
      "givenName": "",
      "image": expect.any(String),
      "role": 1,
      "country": null,
      "enable": true
    },
    "token": expect.any(String), 
  }
const protecUsers =
[
    {
      "id": expect.any(String),
      "email": "josenomeacuerdo@hotmail.com",
      "nickname": expect.any(String),
      "givenName": "",
      "image": expect.any(String),
      "role": 1,
      "country": null,
      "enable": true
    }
  ]
  const protecUser =
  {
        "id": expect.any(String),
        "email": "josenomeacuerdo@hotmail.com",
        "nickname": expect.any(String),
        "givenName": "",
        "image":expect.any(String),
        "role": 1,
        "country": null,
        "enable": true,
  }
const newUser =
{
    email: "usuarionuevo@hotmail.com",
    given_name: "usuario ejemplo",
    picture: "00.png",
    role: 2,
    country: "nocountry",
    enable: true,
}
const updatedUser = 
{
    "id": expect.any(String),
    "email": "usuarionuevo@hotmail.com",
    "password": expect.any(String),
    "nickname": expect.any(String),
    "given_name": expect.any(String),
    "picture":expect.any(String),
    "role": 2,
    "country": expect.any(String),
    "enable": true,
   }
export {
    userCreated,
    userLogged,
    protecUsers,
    protecUser,
    newUser,
    updatedUser,
}     