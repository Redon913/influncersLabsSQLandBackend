const express = require('express');

const mysql = require('mysql2');
const connection = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '123456789',
            database: 'world'
        });
const cors = require('cors')

var whitelist = ['http://localhost:4200']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router = express.Router()

app.use('/api', router);

router.get('/', (req,res,next)=>{
    res.send('API route');
})
router.get('/getBill/:id', (req, res, next) => {
    const id = req.params.id;
    connection.execute(`call getBillbyId(${id})`, [], (err, results, fields) => {
        if (err) {
            res.sendStatus(500);
        }
        console.log(results[0]);
        res.status(200).json(results[0]);
        next();
    });
});

router.get('/getAlloders', (req, res, next) => {

    connection.execute(`call getAlloders()`, [], (err, results, fields) => {
        if (err) {
            res.sendStatus(500);
        }
        console.log(results[0]);
        res.status(200).json(results[0]);
        next();
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});