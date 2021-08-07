const express = require('express'); 
require('dotenv').config('./env/server.env');//env 로드 모듈

const app = express(); 

app.use(express.json()); //bodyparser 설정
app.use(express.urlencoded({extended: true}));//bodyparser 설정

const port = process.env.PORT || 5000; 

app.get('/test', (req, res) => {
    res.status(200).send({
        message : "test!"
    })
});
app.post('/test', (req, res) => {

});


app.listen(port, () => logger.info(`Server Start Listening on port ${port}`));s
