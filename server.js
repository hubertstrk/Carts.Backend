var express = require('express')
  , routes = require('./routes')
  , carts = require('./routes/carts')
  , tags = require('./routes/tags')
  , spellcheck = require('./routes/spellcheck')
  , http = require('http')
  , path = require('path')

var app = express()

app.configure(function(){
  app.set('port', process.env.PORT || 3000)
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)
  app.use(express.static(path.join(__dirname, 'public')))
})

app.configure('development', function(){
  app.use(express.errorHandler())
})

app.get('/', routes.index)

app.get('/api/carts', carts.all)
app.post('/api/carts', carts.add)
app.put('/api/carts', carts.put)
app.delete('/api/carts/:rowKey', carts.delete)

app.get('/api/tags', tags.all)
app.get('/api/tags/:fkCart', tags.get)
app.post('/api/tags', tags.add)
app.put('/api/tags', tags.put)
app.delete('/api/tags/:rowKey', tags.delete)

app.get('/api/spellcheck/:text', spellcheck.spellcheck)

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'))
})
