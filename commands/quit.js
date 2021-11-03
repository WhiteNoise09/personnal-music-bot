const { SlashCommandBuilder } = require("@discordjs/builders");
const { getVoiceConnection, entersState, VoiceConnectionStatus } = require('@discordjs/voice');
const { Interaction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quit')
        .setDescription('quitte votre salon vocal'),
        /**
         * @param {Interaction} interaction 
         */
    async execute(interaction) {
        const { guild } = interaction.member.voice;
        
        const connection = getVoiceConnection(guild.id);
        
        if(!connection) return interaction.reply("Je ne suis actuellement connecté à aucun salon vocal.");
        
        connection.destroy();

        try {
            await entersState(connection, VoiceConnectionStatus.Destroyed);
            interaction.reply('Déconnecté !');
        } catch(e) {
            interaction.reply('Il y a eu une erreur.')
            console.error(e);
        }

    }
}