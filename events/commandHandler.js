const { Interaction } = require("discord.js")

module.exports = {
    type: 'interactionCreate',
    /** 
     * @param {Interaction} interaction 
     */
    callback(interaction) {
        if(!interaction.isCommand()) return;

        const { commandName, client } = interaction;
        const command = client.commands.get(commandName);

        try {
            command.execute(interaction);
        } catch(e) {
            console.error(e);
        }
    }
}