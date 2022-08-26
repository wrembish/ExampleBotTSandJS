require('dotenv').config()
import * as fs from 'node:fs'
import * as path from 'node:path'
import { Awaitable, Client as DiscordClient, Collection as DiscordCollection, GatewayIntentBits } from 'discord.js'
import Command from './classes/Command'
import { MongoClient, ServerApiVersion } from 'mongodb'
import { ENVMISSINGMESSAGE } from './classes/Constants'

// Create the Discord Bot Client
const client : DiscordClient = new DiscordClient({
    intents : [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

// Create the collection of available Slash Commands
const cmmnds : DiscordCollection<string, Command> = new DiscordCollection<string, Command>()
const commandsPath : fs.PathLike = path.join(__dirname, 'commands')
const commandFiles : string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'))

for(const file of commandFiles) {
    const filePath : string = path.join(commandsPath, file)
    const { command } = require(filePath)
    cmmnds.set(command.data.name, command)
}

// Create the Event Handlers for the Discord Client
const eventsPath : fs.PathLike = path.join(__dirname, 'events')
const eventFiles : string[] = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'))

for(const file of eventFiles) {
    const filePath : string = path.join(eventsPath, file)
    const { event } = require(filePath)
    if(event.once) client.once(event.name, (...args) : Awaitable<void> => event.execute(...args))
    else client.on(event.name, (...args) : Awaitable<void> => event.execute(...args))
}

// Connect to the MongoDB Database if provided
let mongo : MongoClient | undefined = undefined
if(process.env.MONGODB_URL) {
    mongo = new MongoClient(process.env.MONGODB_URL, { serverApi : ServerApiVersion.v1 })
    mongo.connect(async (error : any) : Promise<void> => {
        if(!error) {

        } else {
            console.error(error)
            mongo = undefined
        }
    })
} else console.error(`MongoDB Url ${ENVMISSINGMESSAGE}`)

// Login with the Discord Bot Client if the Token is provided in the Environment Variables
if(process.env.TOKEN) {
    client.login(process.env.TOKEN)
} else console.error(`Discord Bot Token ${ENVMISSINGMESSAGE}`)

// Export constants that may be used across other files
export const commands : DiscordCollection<string, Command> = cmmnds
export const database : MongoClient | undefined = mongo