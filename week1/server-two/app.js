//Express
const express = require('express')
const app = express()
const port = 3000

//PUG
const pug = require('pug');
const compiledFunction = pug.compileFile('views/template.pug');

//app.use(express.static('public'));
app.use(express.static(compiledFunction({
  name: 'Timothy',
  age: 6,
  weight: 5
})));

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/catinfo', (req, res) => {
    const cat = {
      'name': 'Frank',
      'age': 6,
      'weight': 5,
    };
    res.json(cat);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))