// Get express framework
const express = require('express');
const pug = require('pug');

pug.escapeMarkup = false;

const view = pug.compileFile('detect-disable-mustache-escape.pug');

// Create an express application
const app = express();


app.get('/greeting', function (req, res) {

   let name = '<script>alert("hello");</script>';
    
   res.send(view({name: `${name}`}));
    
});


// Start Application (on all network interface)
app.listen(3000, () => console.log('app listening on 3000')); 
