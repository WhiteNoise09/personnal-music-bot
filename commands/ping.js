const { SlashCommandBuilder } = require("@discordjs/builders");
const { Interaction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('vérifie si le bot est en ligne'),
        /**
         * @param {Interaction} interaction 
         */
    execute(interaction) {
        interaction.reply('Pong !');
    }
}