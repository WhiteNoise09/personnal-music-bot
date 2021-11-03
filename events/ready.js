module.exports = {
    type: 'ready',
    once: true,
    callback(client) {
        console.log(`Connected as ${client.user.tag} !`);
    }
}