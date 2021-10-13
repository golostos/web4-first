// import express from 'express' // es-modules
const express = require('express')
const { Sequelize, DataTypes, Model } = require('sequelize');
const app = express()
const cors = require('cors')

const sequelize = new Sequelize('chat_21', 'chat_21_user', 'user123', {
    host: 'localhost',
    dialect: 'mysql'
});

class Message extends Model { }

Message.init({
    // Model attributes are defined here
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Message' // We need to choose the model name
});

function start() {
    app.use('/api', cors())
    app.use('/api', express.json())

    // HTTP method GET
    app.get('/api/chat', async function (req, res) {
        // res.send('Hello World!!')
        const messages = await Message.findAll()
        res.send(messages)
    })

    // HTTP method POST
    app.post('/api/chat', async (req, res) => {
        const message = req.body
        const messageFromDb = await Message.create(message)
        res.send(messageFromDb)
    })

    app.listen(3000, () => {
        console.log('http://localhost:3000');
    })
}

(async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
        console.log('Successfull sync');
        start()
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
})();
