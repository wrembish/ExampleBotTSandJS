/**
 * Class for defining Discord event listeners
 */
export default class DiscordEvent {
    public name : string
    public once : boolean
    public execute : Function

    /**
     * Constructor for Discord Events
     * @param name The name of the event
     * @param once Whether or not the event is run only once
     * @param execute The Function / code that will execute when an event listener is given this Event
     */
    constructor(name : string, once : boolean, execute : Function) {
        this.name = name
        this.once = once
        this.execute = execute
    }
}