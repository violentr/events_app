const express = require('express');
const hbs = require('hbs');
const request = require('request');
var app = express();

var url = 'https://mock-api.drinks.test.siliconrhino.io/events'

app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('list', (items, options) => {
  var out = "<ul>"

  for(var i=0, l=items.length; i<l; i++) {
    out = out + `<li><a href=/${i+1}>` + options.fn(items[i]) + "</a></li>";
  }
  return out + "</ul>"
});

hbs.registerHelper('show', (items, options) => {
  console.log('Items..', options.fn(items))
  var out = "<ul>"
  var keys = Object.keys(items)
  for (i in  keys){
    value = items[keys[i]]
    out = out + "<li>" + value + "</li>";
    console.log('Value' , value)
  }
  return out + "</ul>"
});

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
app.get('/:id', (req, res) => {
  var params = req.params.id
  request(url + `/${params}`, (error, response, body) => {
  body = JSON.parse(body)
    if(error) {
      body = 'something went wrong'
    }
  res.render('show.hbs', {
    pageTitle: 'Drinks',
    rawData: JSON.stringify(body),
    data: body
  });
    console.log('BOdy..', body)
 })
})

app.listen(3000)
