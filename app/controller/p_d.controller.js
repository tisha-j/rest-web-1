const P_d = require("../models/p_d.model.js");

// Create and Save a new p_d
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a p_d
    const p_d = new P_d({
      Product_name: req.body.Product_name,
      Serial_no: req.body.Serial_no,
      Quantity: req.body.Quantity,
      Price_Per_Unit: req.body.Price_Per_Unit,
      Vendor_name: req.body.Vendor_name || false
    });
  
    // Save P_d in the database
    P_d.create(p_d, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the p_d."
        });
      else res.send(data);
    });
  };

  // Retrieve all p_d from the database (with condition).
exports.findAll = (req, res) => {
    const Product_name = req.query.Product_name;
  
    P_d.getAll(Product_name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send(data);
    });
  };
  
  exports.findAllPublished = (req, res) => {
    P_d.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    P_d.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found P_d with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving P_d with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    P_d.updateById(
      req.params.id,
      new P_d(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found p_d with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating p_d with id " + req.params.id
            });
   exports.delete = (req, res) => {
  P_d.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.id
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};       }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    P_d.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found p_d with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete p_d with id " + req.params.id
          });
        }
      } else res.send({ message: `p_d was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    P_d.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all data."
        });
      else res.send({ message: `All data was deleted successfully!` });
    });
  };

  