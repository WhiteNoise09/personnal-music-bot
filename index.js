const fs = require('fs');

const { commandsPath, eventsPath } = require('./config.json');
const { token } = require('./token.json');

const { Client, Intents } = require('discord.js');
const { SlashCommandStringOption } = require('@discordjs/builders');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });
client.commands = new Map();

fs.readdirSync(commandsPath).forEach(file => {
    const command = require(`${commandsPath}/${file}`);

    client.commands.set(command.data.name, command);
});

fs.readdirSync(eventsPath).forEach(file => {
    const { once, type, callback } = require(`${eventsPath}/${file}`);

    once ?
        client.once(type, callback):
        client.on(type, callback);
});

client.login(token);

// prototype extends
SlashCommandStringOption.prototype.setAutocomplete = new function(boolean) {
    this.autocomplete = true;
}