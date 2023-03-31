const express = require('express')
const {json} = require('express')
const res = require('express/lib/response')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./routes/auth');

const routes = require('./routes/route');
const userModel = require('./model/user');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded());
mongoose.connect("mongodb://127.0.0.1:27017/passport-jwt", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(console.log("Connected to MongoDB"));
mongoose.Promise = global.Promise;
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;


//define logger, its format and transport 

const logger = createLogger({
    format: combine(
      timestamp(),
      prettyPrint()
    ),
    transports: [
        
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({filename: 'combined.log'})
      ],
  });


//Define add, sub, mult, div functions

const add= (n1,n2) => {
    funcName=add.name;
    return [n1+n2,funcName];
}

const sub= (n1,n2) => {
    funcName=sub.name;
    return [n1-n2,funcName];
}


const mult= (n1,n2) => {
    funcName=mult.name;
    return [n1*n2,funcName];
}

const div= (n1,n2) => {
    funcName=div.name;
    return [n1/n2,funcName];
}

//Endpoint for addition of numbers
app.get('/add',passport.authenticate('jwt', { session: false }),function(req,res){
    try{

        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        //check if n1 or n2 are undefined
        if(req.query.n1 == undefined) 
        {
            res.status(400).send("Error: value of n1 is not defined")
            logger.error("Error: n1 is not defined")
        }

        else if(req.query.n2 == undefined) 
        {
            res.status(400).send("Error: value of n2 is not defined")
            logger.error("Error: n2 is not defined")
        }

        //check if n1 or n2 are not numbers
        else if (isNaN(n1))
        {
            res.status(400).send(`Error: Value '${req.query.n1}' sent for parameter n1 is not a number`)
            logger.log({
                level: 'error',
                message: `Error: Value '${req.query.n1}' sent for parameter n1 is not a number`
              });
        }

        else if (isNaN(n2))
        {
            res.status(400).send(`Error: Value '${req.query.n2}' sent for parameter n2 is not a number`)
            logger.log({
                level: 'error',
                message: `Error: Value '${req.query.n2}' sent for parameter n2 is not a number`
              });
        }

        //Numbers received, proceed with arithmetic operation
        else 
        {
            logger.info(`Parameters '${n1}' and '${n2}' received for addition`);
            const numbers = add(n1,n2);
            result = numbers[0]
            res.status(200).json({statuscocde:200, data: result }); 
            logger.log({
                level: 'info',
                message: `Provided numbers have been added,the result of addition of ${n1} and ${n2} is ${result}`,
                funcName: `${numbers[1]}`
            })
        }
    }
    catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
        logger.log({
            level: 'error',
            message: 'Error while Adding numbers!',
            funcName: `${numbers[1]}`
          });
      }
    } 
)

//Endpoint for subtraction of numbers

app.get('/sub',passport.authenticate('jwt', { session: false }),function(req,res){
    try{

        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        //check if n1 or n2 are undefined
        if(req.query.n1 == undefined) 
        {
            res.status(400).send("Error: value of n1 is not defined")
            logger.error("Error: n1 is not defined")
        }

        //check if n1 or n2 are not numbers
        else if(req.query.n2 == undefined) 
        {
            res.status(400).send("Error: value of n2 is not defined")
            logger.error("Error: n2 is not defined")
        }
 
        else if (isNaN(n1))
        {
            res.status(400).send(`Error: Value '${req.query.n1} sent for parameter n1 is not a number`)
            logger.log({
                level: 'error',
                message: `Error: Value '${req.query.n1} sent for parameter n1 is not a number`
              });
        }

        else if (isNaN(n2))
        {
            res.status(400).send(`Error: Value '${req.query.n2}' sent for parameter n2 is not a number`)
            logger.log({
                level: 'error',
                message: `Error: Value '${req.query.n2}' sent for parameter n2 is not a number`
              });
        }

        //Numbers received, proceed with arithmetic operation
        else
        {
            logger.info(`Parameters '${n1}' and '${n2}' received for subtraction`);

            const numbers = sub(n1,n2);
            result = numbers[0]
            res.status(200).json({statuscocde:200, data: result });
            logger.log({
                level: 'info',
                message: `Provided numbers have been subtracted,the result of subtraction of ${n1} and ${n2} is ${result}`,
                funcName: `${numbers[1]}`
            }); 
        }
    }
    catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
        logger.log({
            level: 'error',
            message: 'Error while subtracting numbers!',
            funcName: `${numbers[1]}`
          });
      }
    }
)

//Endpoint for multiplication of numbers
app.get('/multiply',passport.authenticate('jwt', { session: false }),function(req,res){
    try{
        
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        //check if n1 or n2 are undefined
        if(req.query.n1 == undefined) {
            res.status(400).send("Error: value of n1 is not defined")
            logger.error("Error: n1 is not defined")
        }

        else if(req.query.n2 == undefined) {
            res.status(400).send("Error: value of n2 is not defined")
            logger.error("Error: n2 is not defined")
        }
        
        //check if n1 or n2 are not numbers
        else if (isNaN(n1))
        {
            res.status(400).send(`Error: Value '${req.query.n1}' sent for parameter n1 is not a number`)
            logger.log({
                level: 'error',
                message: `Error: Value '${req.query.n1}' sent for parameter n1 is not a number`
              });
        }

        else if (isNaN(n2))
        {
            res.status(400).send(`Error: Value '${req.query.n2}' sent for parameter n2 is not a number`)
            logger.log({
                level: 'error',
                message: `Error: Value '${req.query.n2}' sent for parameter n2 is not a number`
              });
        }

        //Numbers received, proceed with arithmetic operation
        else
        {
            logger.info(`Parameters '${n1}' and '${n2}' received for multiplication`);
            const numbers = mult(n1,n2);
            result = numbers[0]

            res.status(200).json({statuscocde:200, data: result }); 
            logger.log({
                level: 'info',
                message: `Provided numbers have been multiplied,the result of multiplication of ${n1} and ${n2} is ${result}`,
                funcName: `${numbers[1]}`
            });
        }
    }
    catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
        logger.log({
            level: 'error',
            message: 'Error while multiplying numbers!',
            funcName: `${numbers[1]}`
          });
      }
    }
)

//Endpoint for division of numbers
app.get('/div',passport.authenticate('jwt', { session: false }),function(req,res){
    try{

        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        //check if n1 or n2 are undefined
        if(req.query.n1 == undefined) {
            res.status(400).send("Error: value of n1 is not defined")
            logger.error("Error: n1 is not defined")
        }

        if(req.query.n2 == undefined) {
            res.status(400).send("Error: value of n2 is not defined")
            logger.error("Error: n2 is not defined")
        }
        
        //check if n1 or n2 are not numbers
        if (isNaN(n1))
        {
            res.status(400).send(`Error: Value '${req.query.n1}' sent for parameter n1 is not a number`)
            logger.log({
                level: 'error',
                message: `Error: Value '${req.query.n1}' sent for parameter n1 is not a number`
              });
        }

        else if (isNaN(n2))
        {
            res.status(400).send(`Error: Value '${req.query.n2}' sent for parameter n2 is not a number`)
            logger.log({
                level: 'error',
                message: `Error: Value '${req.query.n2}' sent for parameter n2 is not a number`
              });
        }

        else if(n2 == 0)
        {
            res.status(400).send('Error: Value of n2 received is 0, division failed.')
            logger.log({
                level: 'error',
                message: 'Error: Value of n2 received is 0, division failed.'
              });
        }

        //Numbers received, proceed with arithmetic operation
        else
        {
            logger.info(`Parameters '${n1}' and '${n2}' received for division`);

            const numbers = div(n1,n2);
            result = numbers[0]
            res.status(200).json({statuscocde:200, data: result }); 
            

            logger.log({
                level: 'info',
                message: `Provided numbers have been divided, the result of division of ${n1} and ${n2} is ${result}`,
                funcName: `${numbers[1]}`
            })
        }
    }
    catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
        logger.log({
            level: 'error',
            message: 'Error while dividing numbers!',
            funcName: `${numbers[1]}`
          });
      }
    }
)
app.use('/', routes);

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});
// Start web server  
app.listen(port, () => {
    console.log("App running at http://localhost:" + port)
})

