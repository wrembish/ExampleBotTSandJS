import { Interaction } from 'discord.js'
import { commands } from '../index'
import Command from 'src/classes/Command'
import DiscordEvent from '../classes/DiscordEvent'
import { COMMANDERRORMESSAGE } from '../classes/Constants'

export const event : DiscordEvent = new DiscordEvent(
    'interactionCreate',
    false,
    async (interaction : Interaction) : Promise<void> => {
        // ignores any interactions that aren't commands
        if(!interaction.isCommand()) return

        // Get the command from the commands Collection
        const command : Command | undefined = commands.get(interaction.commandName)

        // If the commands exists, try to execute it and send an error message if it fails
        if(command) {
            try {
                await command.execute(interaction)
            } catch(error : any) {
                console.error('Error: ', error)
                await interaction.reply({ content : COMMANDERRORMESSAGE, ephemeral : true })
            }
        }
    }
)