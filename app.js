const express = require('express');
const app = express()
const mongoose = require('mongoose');
const Chat = require("./models/chat.js")
const methodOverride = require('method-override')

const port = 8080;

const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));


main()
    .then(() => {
        console.log("Connection Sucessfull")
    })
    .catch((err) => {
        console.log(err)
    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Home Route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find()
    res.render("index.ejs", { chats })
})

//New Route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs")
})

//create rote
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    })
    newChat
        .save()
        .then(() => {
            console.log(res)
        })
        .catch((err) => { 
            console.log(err) 
        })
    res.redirect("/chats")
})

//edit route
app.get ("/chats/:id/edit", async(req,res) => {
    let {id} = req.params;
    let chats = await Chat.findById(id);
    res.render ("edit.ejs", {chats})
})

//update route
app.put ("/chats/:id", async (req,res) =>{
    let {id} = req.params;
    let {msg : newMsg} = req.body;
    let updatedMsg = await Chat.findByIdAndUpdate (id, {msg: newMsg}, {runValidators : true}, {new: true})
    res.redirect ("/chats");
})

//Destroy Route
app.delete ("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let deleteMsg = await Chat.findByIdAndDelete (id);
    console.log (deleteMsg);
    res.redirect ("/chats")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});