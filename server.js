
const express = require('express');
const app = express();
const port = 3000;

//helmet security
const helmet = require('helmet');

app.use(helmet());

//rate limiter
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

//
app.use(express.json());
//
app.get('/', (req, res) => {
  res.send('Hello World!');
});
//
app.post('/user',(req,res)=>{
  const {name}=req.body;

  if(!name || typeof name !=='string'){
    return res.status(400).json({
      message: 'Invalid name'
    })
  }
  res.json({
    message:`hi ${name}`,
    status:200
 })
})
//
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});