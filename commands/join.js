const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');
const { Interaction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('rejoint votre salon vocal'),
        /**
         * @param {Interaction} interaction 
         */
    async execute(interaction) {
        const { channel } = interaction.member.voice;
        
        if(!channel) return interaction.reply("Vous devez être connecté à un salon vocal.");

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
        });

        try {
            await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
            interaction.reply("Salon vocal rejoint !")
        } catch (error) {
            interaction.reply('Désolé, il y a eu une erreur.')
            connection.destroy();
            console.error(error);
        }
    }
}