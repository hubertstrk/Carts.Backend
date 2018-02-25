const uuidV4 = require('uuid/v4')
const azure = require('azure-storage')
const config = require('./config')

exports.all = function (req, res) {
  var query = new azure.TableQuery()
  var tableSvc = azure.createTableService(config.config.accountName, config.config.accountKey)
  tableSvc.queryEntities(config.config.tableNameCart, query, null, function (error, result, response) {
    if (!error) {
      res.json(response.body.value)
    } else {
      res.send(error)
    }
  })
}

exports.add = function (req, res) {
  const id = uuidV4()
  var entGen = azure.TableUtilities.entityGenerator
  var cart = {
    PartitionKey: config.config.partitionKey,
    RowKey: id,
    name: req.body.name,
    shop: req.body.shop
  }
  var tableSvc = azure.createTableService(config.config.accountName, config.config.accountKey)
  tableSvc.insertEntity(config.config.tableNameCart, cart, function (error, result, response) {
    if (!error) {
      res.json(cart)
    } else {
      res.send(error)
    }
  })
}

exports.put = function (req, res) {
  var tableSvc = azure.createTableService(config.config.accountName, config.config.accountKey)
  tableSvc.mergeEntity(config.config.tableNameCart, req.body.cart, function (error, result, response) {
    if (error) {
      res.send(error)
    } else {
      res.json(req.body.cart)
    }
  })
}

exports.delete = function (req, res) {
  var tableSvc = azure.createTableService(config.config.accountName, config.config.accountKey)
  var cartToDelete = {
    RowKey: req.params.rowKey,
    PartitionKey: config.config.partitionKey
  }
  tableSvc.deleteEntity(config.config.tableNameCart, cartToDelete, function (error, response) {
    if (error) {
      res.json(rerror)
    } else {
      res.status(200).send();
    }
  })
}

// const createTable = (name) => {
//   const tableService = azure.createTableService(config.accountName, config.accountKey)
//   tableService.createTableIfNotExists(name, (error, result, response) => {
//     if (!error) {

//     }
//   })
// }