'use strict';
const startTime = Date.now();

//#region  ---------------------	Packages	---------------------
const fs = require('fs');
const Discord = require('discord.js');
const { GatewayIntentBits } = require('discord.js');
const Bot = require('./models/bot');

//#endregion
//#region  ---------------------	Setup		---------------------
process.env.LOGGING = false;

const config = JSON.parse(fs.readFileSync(`./settings.json`));
const cookies = JSON.parse(fs.readFileSync(`./cookies.json`));
const bot = new Bot({ autoReconnect: true, intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildVoiceStates
] }, config, cookies);

//#endregion
//#region  ---------------------	Handlers	---------------------

bot.on('ready', async () => {
	bot.start();
	bot.user.setActivity(`over ${bot.guilds.cache.size} servers...`, { type: 'WATCHING' });

	const startuptime = Date.now() - startTime;
	if (process.env.LOGGING) {
		console.log('ACTIVE SERVERS: ')
		bot.guilds.cache.each(guild => console.log(`${guild.id} | ${guild.name}`));
	}

	const commands = require('./slash');
	commands.forEach(async (cmd) => {
		await bot.application.commands.create(cmd);
	});

	console.log(`\nReady to begin! Serving in ${bot.guilds.cache.size} servers. Startup time: ${startuptime}ms`);
});

/**
 * @param {Discord.ChatInputCommandInteraction} int
 */
function interactionCreate(int) {
	if (!int.isChatInputCommand()) return;
	
	let name = int.commandName;
	if (int.options.getSubcommand(false)) {
		name += '_' + int.options.getSubcommand();
	}

	if (bot.commandDict[name]) {
		const guild = bot.getGuild(int.guild);
		bot.runCommand(name, guild, int);
	}
}
bot.on('interactionCreate', interactionCreate);

bot.on('voiceStateUpdate', (oldState, newState) => {
	const guild = bot.getGuild(oldState.guild);

	if (guild.queue.voice && guild.queue.voice.id === oldState.channelId) {
		let channelMembers = oldState.channel.members;
		// Leaves vc if the only user in the vc is the bot itself
		if (channelMembers.size === 1 && channelMembers.firstKey() === bot.ID) {
			bot.sendNotification('⏹ Music stopped since everyone left the channel.', 'info', {
				channel: guild.queue.text, member: oldState.member
			});
			guild.queue.end();
		}
	}
});

bot.on('error', (err) => {
	console.error('—————————— ERROR ——————————');
	console.error(err);
	console.error('———————— END ERROR ————————');
});

bot.on('disconnected', () => {
	console.error('——————— DISCONNECTED ——————');
});

bot.on('guildCreate', guild => {
	bot.user.setActivity(`over ${bot.guilds.cache.size} servers...`, { type: 'WATCHING' });
	bot.getGuild(guild); // Initializes a new guild
	if (process.env.LOGGING) console.log(`New guild: ${guild.name}`);
})

bot.login(bot.TOKEN);

//#endregion