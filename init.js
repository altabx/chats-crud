const mongoose = require('mongoose');
const Chat = require ("./models/chat.js")

main()
    .then (() => {
    console.log ("Connection Sucessfull")
})
    .catch ((err) => {
        console.log (err)
    })

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats = [
    {
        from : "Altab",
        to : "Virat",
        msg : "we all miss you Virat",
        created_at : new Date()
    },
        {
        from : "Altab",
        to : "Rohit",
        msg : "Please Leave MI",
        created_at : new Date()
    },
        {
        from : "yoyo",
        to : "Badsha",
        msg : "I am the best",
        created_at : new Date()
    },
        {
        to : "Laz",
        from : "Ani",
        msg : "Heyyy,,, How are you",
        created_at : new Date()
    },
];

Chat.insertMany(allchats);