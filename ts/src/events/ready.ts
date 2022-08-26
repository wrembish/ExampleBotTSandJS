import { Client } from 'discord.js'
import DiscordEvent from '../classes/DiscordEvent'

/**
 * On ready event. This event only occurs once, and will run any code 
 * necessary for after the bot connects and alert the console that the
 * client connected successfully
 */
export const event : DiscordEvent = new DiscordEvent(
    'ready',
    true,
    async (client : Client) : Promise<void> => {
        console.log(`Ready! Logged in as ${client.user?.tag}!`)
    }
)