require('dotenv').config()
const fs = require('node:fs')
const path = require('node:path')
const { Client, Collection, GatewayIntentBits } = require('discord.js')
const { MongoClient, ServerApiVersion } = require('mongodb')

const client = new Client({
    intents : [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.commands = new Collection()
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for(const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    client.commands.set(command.data.name, command)
}

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for(const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath)
    if(event.once) client.once(event.name, (...args) => event.execute(...args))
    else client.on(event.name, (...args) => event.execute(...args))
}

client.database = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser : true,
    useUnifiedTopology :true,
    serverApi  : ServerApiVersion.v1
})

client.database.connect(async error => {
    if(!error) {

    } else {
        console.error(error)
        client.database = undefined
    }
})

client.login(process.env.TOKEN)