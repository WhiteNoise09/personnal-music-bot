const { AutocompleteInteraction } = require('discord.js');
const yt = require('youtube-search-api');

module.exports = {
    type: 'interactionCreate',
    /**
     * @param {AutocompleteInteraction} interaction
     */
    async callback(interaction) {
        if(!interaction.isAutocomplete()) return;

        if(interaction.commandName === 'play') {
            const query = interaction.options.getString('query');
            const results = (await yt.GetListByKeyword(query))
                .items
                .filter(i => i.type === 'video')
                .map(video => {
                    return {
                        name: `${video.length.simpleText} - ${video.title} - ${video.channelTitle}`.slice(0, 99),
                        value: video.id
                    }
                });

            interaction.respond(results);
        } 
    }
}