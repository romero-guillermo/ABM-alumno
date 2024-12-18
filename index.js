const express = require("express")
const app = express()



const bodyParser = require('body-parser');


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config();

const secret = process.env.SECRET;
const port = process.env.PORT


require("./controllers/tareasControllers.js")(app);


app.listen(port, ()=>{
   console.log("ejecutado en puerto " + port)
})