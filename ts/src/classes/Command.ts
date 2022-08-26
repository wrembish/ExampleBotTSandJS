import { SlashCommandBuilder } from 'discord.js'

/**
 * Class for building Slash Commands
 */
export default class Command {
    public data : SlashCommandBuilder
    public execute : Function

    /**
     * Constructor for Slash Commands
     * @param name The name of the Slash Command
     * @param description The description that shows on the Slash Command
     * @param execute The Function / code that will execute when the Slash Command is used
     */
    constructor(name : string, description : string, execute : Function) {
        this.data = new SlashCommandBuilder()
            .setName(name)
            .setDescription(description)

        this.execute = execute
    }
}