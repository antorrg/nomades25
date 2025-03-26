import dotenv from 'dotenv'
const envFile = process.env.NODE_ENV==='development'? '.env.development' : process.env.NODE_ENV==='test'? '.env.test' : process.env.NODE_ENV==='preview'? '.env.development': '.env';
dotenv.config({ path:envFile })

const {PORT, SECRET_KEY, DB_USER,  DB_PASSWORD,  DB_HOST,  DB_NAME, RENDER_DB, USER_IMG, GMAIL_USER, GMAIL_APP_PASS, S_USER_EMAIL,
    S_USER_PASS, DEFAULT_PASS, CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET, }=process.env;

const LocalDb = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

export default {
 Port: PORT,
 Status: process.env.NODE_ENV,
 ConnectDb : process.env.NODE_ENV==='development'? LocalDb : process.env.NODE_ENV==='production'? RENDER_DB : LocalDb,
 optionRender: process.env.NODE_ENV==='production'? true : false,
 SecretKey: SECRET_KEY,
 UserEmail : S_USER_EMAIL,
 UserPass : S_USER_PASS,
 userImg: USER_IMG,
 defaultPass : DEFAULT_PASS,
 gmailUser: GMAIL_USER,
 gmailPass: GMAIL_APP_PASS,
 CloudName: CLOUD_NAME,
 CloudApiKey: CLOUD_API_KEY,
 CloudApiSecret : CLOUD_API_SECRET,
}

