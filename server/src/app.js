var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/posts')
var db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"))
db.once("open", function(callback){
  console.log("Connection Succeeded")
})

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var News = require("../models/news")
var Topic = require("../models/topic")
var Status = require("../models/status")

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// ---- begin region news

// get all news
app.get('/news', (req, res) => {
  News.find()
  .populate('idTopics', 'title')
  .populate('idStatus', 'title')
  .sort({_id:-1})
  .exec( (error, news) => {
    if (error) { console.error(error) }
    res.send({
      news: news
    })
  })
})

// Create a news
app.post('/news', (req, res) => {
  var db = req.db
  var title = req.body.title
  var description = req.body.description
  var idStatus = req.body.idStatus
  var idTopics = req.body.idTopics
  var new_news = new News({
    title: title,
    description: description,
    idStatus: idStatus,
    idTopics:idTopics
  })

  new_news.save( (error) => {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

// Fetch single post
app.get('/news/:id', (req, res) => {
  var db = req.db
  News.findOne({ _id : req.params.id })
  .exec( (error, news) => {
    if (error) { console.error(error) }
    res.send({
      news: news
    })
  })

})

// Update a news
app.put('/news/:id', (req, res) => {	
  var db = req.db
  News.findById(req.params.id, 'title description idStatus idTopics',  (error, news) => {
    if (error) { console.error(error) }

    news.title = req.body.title
    news.description = req.body.description
    news.idStatus = req.body.idStatus
    news.idTopics = req.body.idTopics
    news.save( (error) => {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a news
app.delete('/news/:id', (req, res) => {
  var db = req.db
  News.remove({
    _id: req.params.id
  }, function(err, news){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

app.get('/news/status/:id', (req, res) => {  
  var db = req.db
  News.find({ idStatus : req.params.id })
  .populate('idTopics', 'title')
  .populate('idStatus', 'title')
  .sort({_id:-1})
  .exec( (error, news) => {
    if (error) { console.error(error) }
    res.send({
      news: news
    })
  })
})

app.get('/news/topic/:id', (req, res) => {  
  var db = req.db
  News.find({ idTopics : req.params.id })
  .populate('idTopics', 'title')
  .populate('idStatus', 'title')
  .sort({_id:-1})
  .exec( (error, news) => {
    if (error) { console.error(error) }
    res.send({
      news: news
    })
  })
})

app.post('/news/filter', (req, res) => {
  var db = req.db
  var params = {}
  if( req.body.idStatus != ''){ params['idStatus'] = req.body.idStatus }
  if( req.body.idTopics != ''){ params['idTopics'] = req.body.idTopics }

  News.find(params)
  .populate('idTopics', 'title')
  .populate('idStatus', 'title')
  .sort({_id:-1})
  .exec( (error, news) => {
    if (error) { console.error(error) }
    res.send({
      news: news
    })
  })
})

// ---- end region news

// ---- begin region topic

// get all topic
app.get('/topic', (req, res) => {
  Topic.find({}, 'title description',  (error, topic) => {
    if (error) { console.error(error) }
    res.send({
      topic: topic
    })
  }).sort({_id:-1})
})

// Create a topic
app.post('/topic', (req, res) => {
  var db = req.db
  var title = req.body.title
  var description = req.body.description
  var idTopics = req.body.idTopics
  var new_topic = new Topic({
    title: title,
    description: description
  })

  new_topic.save( (error) => {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

//get topic by id
app.get('/topic/:id', (req, res) => {  
  var db = req.db
  Topic.findById(req.params.id)
  .exec( (error, news) => {
    if (error) { console.error(error) }
    res.send({
      news: news
    })
  })
})

// Update a topic
app.put('/topic/:id', (req, res) => {
  var db = req.db
  Topic.findById(req.params.id, 'title description',  (error, topic) => {
    if (error) { console.error(error) }

    topic.title = req.body.title
    topic.description = req.body.description
    topic.save( (error) => {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a topic
app.delete('/topic/:id', (req, res) => {
  var db = req.db
  Topic.remove({
    _id: req.params.id
  }, function(err, topic){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})
// ---- end region topic

// ---- begin region status

// get all status
app.get('/status', (req, res) => {
  Status.find({}, 'title',  (error, status) => {
    if (error) { console.error(error) }
    res.send({
      status: status
    })
  }).sort({_id:-1})
})

// Create a status
app.post('/status', (req, res) => {
  var db = req.db
  var title = req.body.title
  var new_status = new Status({
    title: title
  })

  new_status.save( (error) => {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

//get status by id
app.get('/status/:id', (req, res) => {  
  var db = req.db
  Status.findById(req.params.id)
  .exec( (error, s) => {
    if (error) { console.error(error) }
    res.send({
      title: s.title
    })
  })
})

// Update a status
app.put('/status/:id', (req, res) => {
  var db = req.db
  Status.findById(req.params.id, 'title',  (error, status) => {
    if (error) { console.error(error) }

    status.title = req.body.title
    status.save( (error) => {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a status
app.delete('/status/:id', (req, res) => {
  var db = req.db
  Status.remove({
    _id: req.params.id
  }, function(err, status){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})
// ---- end region status

console.log('Server is running at ' + ( process.env.PORT || 8082) )
app.listen(process.env.PORT || 8082)