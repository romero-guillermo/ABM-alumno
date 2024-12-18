

module.exports = function (app) {
    app.get("/tareas",  async function(req, res){
        let services = require("../services/tareasServices")
        let response = await services.getTareas()
        console.log(response.result)
        res.send(response.result)
        
     })

     app.get("/tareas/:id", async function(req, res) {
      let id = req.params.id;
      let services = require("../services/tareasServices");
      let response = await services.getTareasById(id);
      console.log(response.result);
      res.send(response.result);
  });

     app.post("/tareas", async function(req, res){

      let body = req.body
      console.log("estoy en el controller")
      console.log(body) 
      let services = require("../services/tareasServices")
      let response = await services.postTareas(body)
      console.log(response.result) 
      console.log(body)
      res.send(response.result);
   })

   app.put("/tareas",async function(req, res){

      let body = req.body
      console.log(body) 
      let services = require("../services/tareasServices")
      let response = await services.putTareas(body)
      console.log(response.result) 
      console.log(body)
      res.send(response.result);
   })

   app.delete("/tareas", async function(req, res){

      let body = req.body
      console.log(body) 
      let services = require("../services/tareasServices")
      let response = await services.deleteTareas(body)
      console.log(response.result) 
      console.log(body)
      res.send(response.result);
   })
}