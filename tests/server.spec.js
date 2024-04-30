const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos un objeto", async ()=>{
        const response = await request(server).get("/cafes");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    })
    it("Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe", async ()=>{
        const response = await request(server).delete("/cafes/6").set('Authorization','Bearer 1234');
        expect(response.statusCode).toBe(404);
    })
    it("Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201",async ()=>{
        const newCafe = {
            id: 1000,
            nombre: "moca",
        }
        const response = await request(server).post("/cafes").send(newCafe);
        expect(response.statusCode).toBe(201);
        expect(response.body).toContainEqual(newCafe);
    })
    it("Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.",async ()=>{
        const newCafe = {
            id: 1000,
            nombre: "moca",
        }
        const response = await request(server).put("/cafes/5").send(newCafe);
        expect(response.statusCode).toBe(400);
    })
});
