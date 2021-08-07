import app from "../app";
import request from "supertest";
import { expect } from "chai";

const req = request.agent(app);

let users = [
    {id: 1, email: 'john@gmail.com', name: 'John'},
    {id: 2, email: 'bob@gmail.com', name: 'Bob'},
    {id: 3, email: 'anna@gmail.com', name: 'Anna'}
]

describe('GET /test',() =>{
    users.forEach(({id}, index) => {
        it('['+index+'] response check / user_id : '+id, done => {
            req
            .get('/test')
            .query({user_id : id})
            .expect(200)
            .then( res => {
                console.log(res.body);
                expect(res.body.query.user_id).to.equal(String(id))
                expect(res.body.success).to.equal(true);
                done();
            })
            .catch( err => {
                console.log('GET /test ERROR : ', err);
                done(err);
            })
        })
    })  
})

request