const uuidV4 = require('uuid/v4')
const azure = require('azure-storage')
const config = require('./config')

exports.all = function (req, res) {
  var query = new azure.TableQuery()
  var tableSvc = azure.createTableService(config.config.accountName, config.config.accountKey)
  tableSvc.queryEntities(config.config.tableNameTag, query, null, function (error, result, response) {
    if (!error) {
      res.json(response.body.value)
    } else {
      res.send(error)
    }
  })
}

exports.get = function (req, res) {
  var query = new azure.TableQuery().where('fkCart eq ?', req.params.fkCart)
  var tableSvc = azure.createTableService(config.config.accountName, config.config.accountKey)
  tableSvc.queryEntities(config.config.tableNameTag, query, null, function (error, result, response) {
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
  var tag = {
    PartitionKey: config.config.partitionKey,
    RowKey: id,
    fkCart: req.body.fkCart,
    name: req.body.name,
    active: req.body.active
  }
  var tableSvc = azure.createTableService(config.config.accountName, config.config.accountKey)
  tableSvc.insertEntity(config.config.tableNameTag, tag, function (error, result, response) {
    if (!error) {
      res.json(tag)
    } else {
      res.send(error)
    }
  })
}

exports.put = function (req, res) {
  var tableSvc = azure.createTableService(config.config.accountName, config.config.accountKey)
  tableSvc.mergeEntity(config.config.tableNameTag, req.body.tag, null, function (error, result, response) {
    if (error) {
      res.send(error)
    } else {
      res.json(req.body.tag)
    }
  })
}

exports.delete = function (req, res) {
  var tableSvc = azure.createTableService(config.config.accountName, config.config.accountKey)
  var tagToDelete = {
    RowKey: req.params.rowKey,
    PartitionKey: config.config.partitionKey
  }
  tableSvc.deleteEntity(config.config.tableNameTag, tagToDelete, function (error, response) {
    if (error) {
      res.json(rerror)
    } else {
      res.status(200).send();
    }
  })
}