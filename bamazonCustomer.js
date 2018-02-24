var mysql = require("mysql");

var inquirer = require("inquirer");



var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayAll();

function displayAll() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);

    inquirer.prompt([
    	 {
      type: "input",
      message: "What is the id number of the item you would like to buy?",
      name: "itemId"
    },
    {
      type: "input",
      message: "How many?",
      name: "itemQuantity",
    }

    	]).then(function(inquirerResponse) {
    var itemId = parseInt(inquirerResponse.itemId);
    var itemQuantity = parseInt(inquirerResponse.itemQuantity);
    //console.log(itemId + itemQuantity);
    //they are numbers here, why do they cease to be numbers?
  
  

getQuantity();





  function getQuantity() {
  var query = connection.query("SELECT stock_quantity FROM products WHERE ?", { item_id: itemId},
  function(err,res){
    if (err) throw err;
    
    console.log("This should tell you the original stock quantity: " + parseInt(res));
    //instead it just returns "Object Object", why?

    if (parseInt(res) < itemQuantity)
    {
      console.log("Insufficient quantity!")
      connection.end();
    }
    else
    {
    var newQuantity = parseInt(res) - itemQuantity;
    console.log("This is the new quantity: " + newQuantity);
    setQuantity();
    }

    function setQuantity(){
      var query = connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newQuantity}, {item_id:itemId}], 
        function(err, res){

          displayPrice();

          function displayPrice(){
            var query = connection.query("SELECT price WHERE ?", {item_id:itemId}, function(err,res){
              console.log("This will cost: $" + (itemQuantity * parseInt(res)));
              //why is it not a number??
              connection.end();
            });
          };
        });
    };

  // logs the actual query being run
  });

}; //function update table bracket

}); //inquirer response function bracket

 }); //this is the displayAll connection query bracket.  HOWEVER, the paren...does that not correspond?

      };// this is the function displayAll() bracket.  But what's the paren for?

  }); //connection.connect bracket.  This is exactly where it should be.  Encompassing everything else.  Same with the paren


  //});

//  }
//}