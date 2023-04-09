const express = require('express')
const app = express()
app.use(express.json());
const mongoose = require('mongoose')
port = process.env.PORT || 4000

// spin up server if connected to database
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(port, () => console.log(`DB connected, server listening: port ${port}`)))
  .catch((err) => console.log(err))

// API routes:
app.set('json spaces', 2)
const Quote = require('./models/quote')
const Counter = require('./models/increment')

// get all quotes
app.get('/api', (req, res) => {
  Quote.find().sort({"id": -1})
    .then((result) => res.json({"quoteList": result}))
    .catch((err) => console.log(err))
});

// post new quote
app.post('/api', (req, res) => {
  Counter.findOneAndUpdate(
    {id: "autoval"},
    {"$inc": {"seq": 1}},
    {new: true})
      .then((cd) => {
        let seqId = 1

        if (cd === null) {
          const newval = new Counter({id: "autoval", seq: 1})
          newval.save()
        } else { seqId = cd.seq }
        
        const newQuote = new Quote({...req.body, id: seqId})
        newQuote.save()
          .then((result) => res.send(result))
          .catch((err) => console.log(err))
      })
})
