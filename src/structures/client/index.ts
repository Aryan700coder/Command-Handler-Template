import { Client, Collection } from "discord.js";
import Logger from "../../utils/logger";
import { CommandType } from "../../typings/command";
import Handler from "../handlers";

export class ExtendedClient extends Client {
    constructor() {
        super({
            intents: 53608447
        })
    }
    public logger = Logger;
    private handler = new Handler();
    public commands:Collection<string, CommandType> = new Collection();
    build() {
        this.logger.info('Logging In...')
        this.login(process.env.token);
        this.logger.success('Logged In!');
        this.loadHandlers();
    };

    private async loadHandlers() {
        this.handler.registerModules();
    }
}