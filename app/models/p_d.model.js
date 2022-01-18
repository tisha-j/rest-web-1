const sql = require("./db.js");

// constructor
const P_d = function(p_d) {
  this.Product_name = p_d.Product_name;
  this.Serial_no = p_d.Serial_no;
  this.Quantity = p_d.Quantity;
  this.Price_Per_Unit = p_d.Price_Per_Unit;
  this.Vendor_name = p_d.Vendor_name;
};

P_d.create = (newP_d, result) => {
    sql.query("INSERT INTO p_d SET ?", newP_d, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created p_d: ", { id: res.insertId, ...newP_d });
    result(null, { id: res.insertId, ...newP_d });
  });
};

P_d.findById = (id, result) => {
  sql.query(`SELECT * FROM p_d WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
        console.log("found p_d: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found p_d with the id
      result({ kind: "not_found" }, null);
    });
  };

  P_d.getAll = (Product_name, result) => {
    let query = "SELECT * FROM p_d";
  
    if (Product_name) {
      query += ` WHERE title LIKE '%${Product_name}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("p_d: ", res);
      result(null, res);
    });
  };

  P_d.getAllPublished = result => {
    sql.query("SELECT * FROM p_d WHERE published=true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("p_d: ", res);
      result(null, res);
    });
  };

  P_d.updateById = (id, p_d, result) => {
    sql.query(
      "UPDATE p_d SET Product_name = ?, Serial_no = ?, Quantity = ?, Price_Per_Unit = ?, Vendor_name = ? WHERE id = ?",
      [p_d.Product_name, p_d.Serial_no, p_d.Quantity, p_d.Price_Per_Unit, p_d.Vendor_name, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found p_d with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated p_d: ", { id: id, ...p_d });
        result(null, { id: id, ...p_d });
      }
    );
  };

  P_d.remove = (id, result) => {
    sql.query("DELETE FROM p_d WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found p_d with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted p_d with id: ", id);
      result(null, res);
    });
  };
  
  P_d.removeAll = result => {
    sql.query("DELETE FROM p_d", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} p_d`);
      result(null, res);
    });
  };
  
  module.exports = P_d;