var supertest = require('supertest')
const request = supertest('https://reqres.in/')
let job;

describe('user manage test suite',()=>{

    beforeAll(() => {
        console.log('Starter running test cases')
    });

    afterAll(()=> {
        console.log('finish running test cases')
    });

    test.each([["pry","TE"]])('POST-Create a new users (%s)', async(name,job) =>{
        let users={
            "name": `${name}`,
            "job": `${job}`
        }
        const response=await request.post('api/users').set("Authentication","3232wdsadsarsfsdfdfs34324")
        expect(response.status).toBe(201)
        job=response.body.job
        expect(response.body.id).toEqual(expect.anything())
        expect(response.body.createdAt).toEqual(expect.anything())
        expect(response.body.id).toHaveLength(3)
        expect(response.body.name).toBeUndefined()
        expect(response.body.job).toBeUndefined()
        // console.log(response.body)    
        // console.log(response.body.id)
        // console.log(response.body.createdAt)
    })

    test('PUT-update user', async done=>{
        let updateUsers={
            "name":"naufal",
            "job":"Senior TE"
        }
        const response = await request.put('api/user/2').send(updateUsers)
        expect(response.status).toBe(200)
        // console.log(response.body)    
        expect(response.body.name).toBe('naufal')
        expect(response.body.job).toBe('Senior TE')
        expect(response.body.updatedAt).toEqual(expect.anything())
        console.log('Update User',response.body)
        done()
    })

    test('DELETE-user', async done =>{
        const response = await request.delete('api/users/2')
        expect(response.status).toBe(204)
        done()  
    })

})