import express from 'express';
import cookieParser from "cookie-parser";
import path from 'path';
import multer from 'multer';
require('dotenv').config({ path: path.join(__dirname, './env/server.env') });

const app = express(); 

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const upload = multer({dest: './upload'});

app.get('/test', (req, res) => { // GET 응답 테스트
    res.status(200).send({
        success : true,
        query : req.query,
        message : 'test'
    });
});

app.post('/test', (req, res) => { // POST body request 테스트
    res.status(200).send({
        success : true,
        data : req.body,
        message : 'test'
    });
});

app.get('/cookie', (req, res) => { // GET Cookie 테스트
    res.cookie('user_id',req.cookies.user_id);
    res.cookie('user_email',req.cookies.user_email);
    res.status(200).send({
        success : true,
        cookie : req.cookies,
        message : 'cookie'
    })
})

app.post('/upload/file',upload.single('file_name'), (req, res) => { // POST file upload 테스트
    res.status(200).send({
        success : true,
        file : req.file
    })
})


export default app;