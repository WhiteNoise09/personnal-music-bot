const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel,
        entersState,
        VoiceConnectionStatus,
        createAudioPlayer,
        createAudioResource, 
        AudioPlayerStatus} = require('@discordjs/voice');
const { CommandInteraction } = require('discord.js');
const yt = require('youtube-search-api');
const ytdl = require('ytdl-core-discord');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('joue une musique dans votre salon vocal')
        .addStringOption(option => {
            option
                .setName('query')
                .setDescription('le nom d\'une musique que vous souhaitez jouer')
                .setRequired(true)
                .autocomplete = true;
            
            return option;
            }),
        /**
         * @param {CommandInteraction} interaction 
         */
    async execute(interaction) {
        await interaction.deferReply();
        const { channel } = interaction.member.voice;
        
        if(!channel) return interaction.editReply("Vous devez être connecté à un salon vocal.");

        const query = interaction.options.getString('query');

        if(!query) return interaction.editReply("Vous devez spécifier une musique !");

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
        });

        try {
            await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
            interaction.editReply("Salon vocal rejoint !")
        } catch (error) {
            interaction.editReply('Désolé, il y a eu une erreur.')
            connection.destroy();
            return console.error(error);
        }

        const video = await getVideo(query);await yt.GetListByKeyword(query);
        const resource = createAudioResource(video);
        const player = createAudioPlayer();

        player.play(resource);

        connection.subscribe(player);

        player.on('stateChange', (oldState, newState) => {
            if(newState.status === AudioPlayerStatus.Playing) interaction.followUp('En train de jouer !');
        })
    }
}

async function getVideo(query) {
    const searchDatas = (await yt.GetListByKeyword(query)).items;
    const videosIds = searchDatas.filter(v => v.type = "video").map(v => v.id);
    const videoUrl = `https://youtube.com/watch?v=${videosIds[0]}`;
    return ytdl(videoUrl)
}