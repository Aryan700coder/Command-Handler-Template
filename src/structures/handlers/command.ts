import { CommandType } from "../../typings/command";

export class Command {
    constructor(commandOptions: CommandType) {
        Object.assign(this, commandOptions);
    }
}

/**
 * @info Credits to reconlx for command handler
 * @info Credit me if your using this for your bot.
 */