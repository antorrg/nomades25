import { sequelize } from "../db.js";

// Esta función inicializa la base de datos
async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); // Esto limpia y sincroniza la base de datos
    //console.log('Base de datos sincronizada exitosamente ✔️')
  } catch (error) {
    console.error("Error sincronizando DB ❌ ", error);
  }
}

//Esta función resetea la base de datos antes de cada prueba si es necesario
async function resetDatabase() {
  await sequelize.sync({ force: true });
}

beforeAll(async () => {
  await initializeDatabase();
});

// beforeEach(async () => {
//   await resetDatabase();
// });

afterAll(async () => {
  await resetDatabase();
  await sequelize.close();
  //console.log('DB cerrada')
});
