const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// An anonymous function as constructor
var user = function() {
  this.name = 'john';
};

// A vulnerable function
function handler(input) {
  console.log(input);
  let query = input[0];
  let param = input[1];
  user['anyVal'] = user[query](param);
  console.log(user);
  console.log(user['anyVal']);
}

// API Endpoint
app.post('/api/user', (req, res) => {
  return res.send(handler(req.body));
});

app.listen(3000, () => console.log('app listening on 3000'));
