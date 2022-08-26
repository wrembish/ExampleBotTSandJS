module.exports = {
    name : 'messageCreate',
    async execute(message) {
        if(message.author.id === message.client.user.id) return

        
    }
}