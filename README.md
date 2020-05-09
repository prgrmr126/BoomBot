# BoomBot

## About

This project is a simple Discord Music bot, so you can have more control over your bots and build them out to your specifications. It includes basic commands and a simple permissions system.

This project is still in progress so report any bugs or issues and they will be fixed as soon as possible.

## Installation

##### Create a settings.json
```
{
	"BOTID":"Your client id",
	"OWNERID":"Your id",
	"PREFIX":"Your prefix",
	"TOKEN":"Your client token",
	"GOOGLE_API_KEY":"Your api key"
}
```

Put all ids/tokens/keys in between the quotation marks.

### Creating a Bot

Login to your discord account and go to [this](https://discordapp.com/developers/applications/) link. Select "new application" and input a name. Once the application is created, copy the **client id** from General Information. Then select bot on the left and select "add bot" and confirm (you may need to change your application name in general information if too many users have this username). Once the bot is added, in the bot menu, select "click to reveal token" to get the **client token**.

To get your id, open up the discord app, go to settings -> appearance, then scroll down to Developer Mode and toggle it on. Then go to a server that you are in and find yourself in the member list and right-click. "Copy ID" should show up, click it and **your id** will automatically be copied to your clipboard.

**Your prefix** is up to you to choose, preferably pick something short and uncommon to start a message with such as "?".

For your API key, go to [this](https://developers.google.com/youtube/v3/getting-started) link and follow instructions 1-3 (make sure to create an unrestricted key). Then go to [this](https://console.developers.google.com/) link and go to the Credentials menu, under API keys, you should see the key you created, copy the **key** and paste it into your settings.json

:warning: DO NOT SHARE YOUR API KEY OR CLIENT TOKEN WITH ANYONE :warning:

### Requirements

1. node.js
3. discord.js
4. Using opusscript or node-opus, ytdl-core
5. simple-youtube-api

#### node.js
Go to [this](https://nodejs.org/en/download/) link and download the nodejs installer for your operating system.
Follow the installation steps to get node.js.
NPM (node package manager) is installed with Node.

#### Dependencies and Setup

After downloading node.js and cloning/downloading the project, in your shell, enter the following:
```bash
cd path/to/project
npm install
```

## Usage

````bash
npm start
````
To terminate the bot just type stop into the shell and enter. You can also `reload`, `load`, and `unload` commands. Reloading allows for modified command files (this does not include "bot.js"), to be refreshed without taking the bot offline. Loading and unloading are pretty straightforward (all commands are automatically loaded on bot startup).

Once the bot has been started, to use any command type it into the shell. Example:
```bash
reload <primary name> # Command aliases won't work in the reload/load/unload commands.

stop # Safely terminates the bot
```

### Commands

* `np` *now playing*
* `pause`
* `ping`
* `play (song)` *entering no song will give the top YouTube music videos*
* `queue`
* `resume`
* `skip`
* `stop`
* `volume (1-10)` *no volume input will display the current volume*
* `prefix (prefix)` **Admin command**
* `channel [voice | text] (channel name | all)` *the last argument is only required when changing designated channels* **Admin command**
* `loop` Loops the song.
* `seek [time]` Skips to the desired time of the song. Example "seek 1h 5m 3s".
* `invite` Gives the invite URL so others can add the bot to their server.
* `dj (dj role)` Assigns a role that can administrate the bot. **Only the owner can use this command.**

## License

MIT License - [LICENSE](LICENSE)
