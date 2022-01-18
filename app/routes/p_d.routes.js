module.exports = app => {
    const p_d = require("../controller/p_d.controller.js");
  
    var router = require("express").Router();
  
    // Create a new p_d
    router.post("/", p_d.create);
  
    // Retrieve all p_d
    router.get("/", p_d.findAll);
  
    // Retrieve all published p_d
    router.get("/published", p_d.findAllPublished);
  
    // Retrieve a single p_d with id
    router.get("/:id", p_d.findOne);
  
    // Update a p_d with id
    router.put("/:id", p_d.update);
  
    // Delete a p_d with id
    router.delete("/:id", p_d.delete);
  
    // Delete all p_d
    router.delete("/", p_d.deleteAll);
  
    app.use('/api/p_d', router);
  };

  