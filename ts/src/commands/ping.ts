import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

/**
 * The hello world of Slash Commands
 */
export const command : Command = new Command(
    'ping',
    'Replies with Pong!',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        await interaction.reply('Pong!')
    }
)