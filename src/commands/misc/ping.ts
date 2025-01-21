import { Command } from "../../structures/handlers/command";

export default new Command({
    name: 'ping',
    description: `Replies with Bot Latency`,
    category: 'misc',
    cooldown: 2000,
    run({ client, interaction}) {
        interaction.reply(`Ping is ${client.ws.ping}`);
    },
})