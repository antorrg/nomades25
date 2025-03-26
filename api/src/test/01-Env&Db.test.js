import env from "../envConfig.js";
import { User, Product, Item, Landing, Image, Media, Work, About } from "../db.js";

describe('Iniciando tests, probando variables de entorno del archivo "envConfig.js" y existencia de tablas en DB.', () => {
  afterAll(() => {
    console.log("Finalizando todas las pruebas...");
  });

  it("Deberia retornar el estado y la variable de base de datos correcta", () => {
    const formatEnvInfo =
      `Servidor corriendo en: ${env.Status}\n` +
      `Base de datos de testing: ${env.ConnectDb}\n` +
      `DialectOptions (ssl, deberia estar en false): ${env.optionRender}`;
    expect(formatEnvInfo).toBe(
      `Servidor corriendo en: testing\n` +
        `Base de datos de testing: postgres://postgres:antonio@localhost:5432/testing\n` +
        `DialectOptions (ssl, deberia estar en false): false`
    );
  });

  it("Deberia responder a una consulta en la base de datos con un arreglo vacío", async () => {
    const users = await User.findAll();
    const products = await Product.findAll();
    const items = await Item.findAll();
    const landing = await Landing.findAll();
    const image = await Image.findAll();
    const media = await Media.findAll();
    const work = await Work.findAll();
    const about = await About.findAll();
    expect(users).toEqual([]);
    expect(products).toEqual([]);
    expect(items).toEqual([]);
    expect(landing).toEqual([]);
    expect(image).toEqual([]);
    expect(media).toEqual([]);
    expect(work).toEqual([]);
    expect(about).toEqual([]);
  });
});
