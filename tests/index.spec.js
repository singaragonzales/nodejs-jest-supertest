import app from "../src/app";
import request from "supertest";

describe("GET /tasks", () => {
    
    test("should respond with a 200 status code", async() => {
       const res =  await request(app).get("/tasks").send()
       expect(res.statusCode).toBe(200)
    })

    test("should reespond with an array", async() => {
        const res = await request(app).get('/tasks').send()
        expect(res.body).toBeInstanceOf(Array)
    })
})

describe("POST /tasks", () => {

    describe("given a title and adescription", () => {
        const newTask = {
            title: "test taks",
            description: "Description task"
        }
        test('Should respondo with a 200 status code', async() => {
            const res = await request(app).post('/tasks').send(newTask)
            expect(res.statusCode).toBe(200)
        })
    
        test('should have a content-type: application/json in header', async() => {
            const res = await request(app).post('/tasks').send(newTask)
            expect(res.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    
        test('should respond with an task ID', async() => {
            const res = await request(app).post("/tasks").send(newTask)
            expect(res.body.id).toBeDefined()
        })
    })

    describe("when title and description is missing", () => {
        test('should response with a 404 status code', async() => {
            const fields = [
                {},
                {title: "title only"},
                {description: "description only"}
            ]

            for(const body of fields){
                const res = await request(app).post('/tasks').send(body)
                expect(res.statusCode).toBe(400)
            }
        })
    })
})
