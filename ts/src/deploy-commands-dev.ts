require('dotenv').config()
import * as fs from 'node:fs'
import * as path from 'node:path'
import { RESTPostAPIApplicationCommandsJSONBody, REST } from 'discord.js'
import { Routes } from 'discord-api-types/v10'
import { DPLYCMNDSUCCESSMESSAGE, ENVMISSINGMESSAGE } from './classes/Constants'

// Create an array of commands to deploy
const commands : RESTPostAPIApplicationCommandsJSONBody[] = []
const commandsPath : fs.PathLike = path.join(__dirname, 'commands')
const commandFiles : string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'))

for(const file of commandFiles) {
    const filePath : string = path.join(commandsPath, file)
    const { command } = require(filePath)
    commands.push(command.data.toJSON())
}

// Create a new REST 
if(process.env.TOKEN) {
    const rest : REST = new REST({ version : '10' }).setToken(process.env.TOKEN)

    // deploy the commands as global application commands
    if(process.env.CLIENT_ID) {
        if(process.env.GUILD_ID) {
            rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body : commands })
                .then(() : void => console.log(DPLYCMNDSUCCESSMESSAGE))
                .catch((error : any) : void => console.error('Error: ', error))
        } else console.error(`Discord Server Guild Id ${ENVMISSINGMESSAGE}`)
    } else console.error(`Discord Bot Client Id ${ENVMISSINGMESSAGE}`)
} else console.error(`Discord Bot Token ${ENVMISSINGMESSAGE}`)