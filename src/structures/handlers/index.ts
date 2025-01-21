import { client } from "../..";
import { ApplicationCommandDataResolvable, ClientEvents } from "discord.js";
import glob from "glob";
import { promisify } from 'util';
import { RegisterCommandsOptions } from "../../typings/client";
import { CommandType } from "../../typings/command";
import { Event } from "./event";

const globPromise = promisify(glob);
export default class Handler {
    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (guildId) {
            client.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registering commands to ${guildId}`);
        } else {
            client.application?.commands.set(commands);
            console.log("Registering global commands");
        }
    }

    async registerModules() {
        // Commands
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(
            `${__dirname}/../../commands/*/*{.ts,.js}`
        );
        commandFiles.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) return;
            console.log(`${command.name} Loaded!`);

            client.commands.set(command.name, command);
            slashCommands.push(command);
        });

        client.on("ready", () => {
            this.registerCommands({
                commands: slashCommands,
                guildId: process.env.guildId
            }).catch(console.warn);
        });
        // Event
        const eventFiles = await globPromise(
            `${__dirname}/../../events/*{.ts,.js}`
        );
        eventFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> = await this.importFile(
                filePath
            );
            client.on(event.event, event.run);
        });
    }
}