import app from "../app";
import request from "supertest";
import { expect } from "chai";
import path from "path";

const users = [
    {id: 1, email: 'john@gmail.com', name: 'John'},
    {id: 2, email: 'bob@gmail.com', name: 'Bob'},
    {id: 3, email: 'anna@gmail.com', name: 'Anna'}
]

describe('GET /test',() =>{
    users.forEach(({id}, index) => {
        const req = request.agent(app); // 매번 새로운 요청 생성
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
});


describe('POST /test',() =>{
    users.forEach(({id, email ,name}, index) => {
        const req = request.agent(app); // 매번 새로운 요청 생성
        it('['+index+'] response check/ user_id : '+id, done => {
            req
            .post('/test')
            .set('Content-Type', 'application/json')
            // .type('application/json')
            .set('Accept', 'application/json')
            .send({user_email : email, user_name : name})
            .expect(200)
            .expect('Content-Type', /json/)
            .then( res => {
                console.log(res.body);
                expect(res.body.data.user_email).to.equal(email);
                expect(res.body.data.user_name).to.equal(name);
                expect(res.body.success).to.equal(true);
                done();
            })
            .catch( err => {
                console.log('POST /test ERROR : ', err);
                done(err);
            })
        })
    });
});

describe('GET /cookie',() =>{
    users.forEach(({id, email ,name}, index) => {
        const req = request.agent(app); // 매번 새로운 요청 생성
        it('['+index+'] response check / user_id : '+id, done => {
            req
            .get('/cookie')
            .set('Cookie', ['user_id='+id,'user_email='+email])
            .expect(200)
            .then( res => {
                console.log(res.body);
                console.log(res.header);
                const getCookie = res.header['set-cookie'];
                console.log(getCookie);
                expect(res.body.success).to.equal(true);
                done();
            })
            .catch( err => {
                console.log('GET /cookie ERROR : ', err);
                done(err);
            })
        })
    })
});

/*
describe('POST /upload/file',() =>{
    it('response check/ user_id', done => {
        req
        .post('/upload/file')
        .set('Content-Type', 'form')
        .field('file_name','image_testfile')
        .attach('image_file1', path.join(__dirname,'../resouce','image1.jpg'))
        .expect(200)
        .then( res => {
            console.log(res.body);
            expect(res.body.success).to.equal(true);
            done();
        })
        .catch( err => {
            console.log('POST /upload/file ERROR : ', err);
            done(err);
        })
    })
}); */