import { CommandInteractionOptionResolver } from "discord.js";
import { client } from "..";
import { Event } from "../structures/handlers/event";
import { ExtendedInteraction } from "../typings/command";

export default new Event('interactionCreate', async(interaction) => {
    if(!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
        if (!command) {
            return console.log("[Command Logger] : That Command dosn't exist")
        }
        try {
            command.run({
                args: interaction.options as CommandInteractionOptionResolver,
                client,
                interaction: interaction as ExtendedInteraction,
            });

        } catch (e) {
            await interaction.reply({
                content: "Oops got a error",
                ephemeral: true,
            });

            console.log(e)
        }
})