const { Client } = require("discord.js")
const { guildID } = require('../config.json');

module.exports = {
    type: 'ready',
    /** 
     * @param {Client} client 
     */
    callback(client) {
        client.application.commands.set(getCommandsArray(client.commands), guildID)
            .then((commands) => console.log(`succesfully registered ${commands.size} commands !`))
            .catch(console.error);
    }
}

function getCommandsArray(commands) {
    const commandsArray = Array.from(commands.values());
    
    return commandsArray.map(c => c.data);
}