const logger =  (req,res,next)=>{
    //to see what user do
        console.log(`${req.method} ${req.protocol} ://${req.get('host')}${req.originalUrl}`);
        //res.json("this message from middle")
        next();
    }

    module.exports = logger;