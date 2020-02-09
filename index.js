const express = require('express')
let config = require('dotenv').config();
let mongoose = require('mongoose');
let fetch = require('node-fetch');

const app = express()

let User = require("./User");

app.use(express.json())

app.get('/users', async (req, res) => {
    console.log(req.headers.key)
    if(req.headers.key === process.env.KEY) {
        const users = await User.find({}).sort({
            points: "desc"
        })
        console.log(users)
        res.json(users)
    } else {
        res.sendStatus(400)
    }
})
app.post('/user', async (req, res) => {
    if(req.headers.key === process.env.KEY) {
    const users = await User.findOne({"userid": req.body.id})
    console.log(users)
    res.json(users)
} else {
    res.sendStatus(400)
}
})
app.post('/set', async (req, res) => {
    if(req.headers.key === process.env.KEY) {
    let ifUser = await User.findOne({
        userid:req.body.id
    })

    if(ifUser) {
        ifUser.points = req.body.points
        ifUser.save()
    }
    else {
        const user = new User({
            userid: req.body.id,
            points: req.body.points
        })

        user.save()
    }
    res.sendStatus(200)
} else {
    res.sendStatus(400)
}
})

app.post('/add', async (req, res) => {
    if(req.headers.key === process.env.KEY) {
    console.log(req.body)
    let ifUser = await User.findOne({
        userid:req.body.id
    })

    if(ifUser) {
        ifUser.points += req.body.points
        ifUser.save()
    }
    else {
        const user = new User({
            userid: req.body.id,
            points: req.body.points
        })

        user.save()
    }
    res.sendStatus(200)
} else {
    res.sendStatus(400)
}
})
app.delete('/remove', async (req, res) => {
    if(req.headers.key === process.env.KEY) {
    await User.deleteMany({})
    res.sendStatus(200)
} else {
    res.sendStatus(400)
}
})
app.listen(process.env.PORT || 3000, async () => {
    console.log("Server Ready")
    let res = await fetch("https://ipapi.co/json/")
    let json = await res.json()
    console.log(json)
})

mongoose.connect(process.env.CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

