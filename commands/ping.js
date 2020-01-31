module.exports = {
	main: function(bot, msg) {
		const start = Date.now();
		msg.channel.send('Pong!').then(function(msg) {
			const latency = Date.now() - start;
			msg.edit(`Pong \`(${latency}ms)\``);
		});
	},
	help: '`Ping the server for latency`',
	usage: 'pause'
};
