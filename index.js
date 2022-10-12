const { Client, GatewayIntentBits } = require("discord.js");

require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  const channel = client.channels.cache.find(
    (channel) => channel.name === "💬-bape-papo-bot-💬"
  );

  channel.send(`TO ONLINE CAMBADA!!! Biiiiiiirl! 💪🏻👶🏻🖕🏻`);
});

client.on("messageCreate", (message) => {
  console.log(
    `New message in channel ${message.channel.name} from ${message.author.tag}: ${message.content}`
  );

  let msg = message.content.toLowerCase();
  if (msg.startsWith("ping")) {
    message.reply("pong");
  }
});

client.login(process.env.TOKEN);
