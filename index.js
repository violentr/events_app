const express = require('express');
const hbs = require('hbs');
const request = require('request');
var app = express();

var url = 'https://mock-api.drinks.test.siliconrhino.io/events'

app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  request(url, (error, response, body) => {
    if(error) {
      body = 'something went wrong'
    }
    body = JSON.parse(body)
    console.log("JSON", body)
    res.render('home.hbs', {
      pageTitle: 'Drinks',
      body: body
    });
  })
})
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Drinks'
  });
})

app.listen(3000)
