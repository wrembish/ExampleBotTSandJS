import { Message } from 'discord.js'
import DiscordEvent from '../classes/DiscordEvent'

/**
 * On messageCreate event. This event can happen more than once.
 * Allows your bot to respond to messages from server members.
 */
export const event : DiscordEvent = new DiscordEvent(
    'messageCreate',
    false,
    async (message : Message) : Promise<void> => {
        // Stops the bot from responding to it's own messages
        // You can also use the following to ignore all bots' messages
        // if(message.author.bot) return
        if(message.client.user && message.client.user.id === message.author.id) return

        // Constant to store the actual string value of the message
        const msg : string = message.content   
    }
)