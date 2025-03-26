import server from './src/server.js'
import env from './src/envConfig.js'
import { sequelize } from './src/db.js'
import initialUser from './src/services/initialUser.js'


server.listen(env.Port, async()=>{
    try {
        await sequelize.sync({alter:true})
        console.log('Database connect succesfully 😉!!')
        //await initialUser()
        console.log(`Server is listening at port ${env.Port}\nServer in ${env.Status}`)
    } catch (error) {
        console.error('Error syncing database: ',error)
    }
})