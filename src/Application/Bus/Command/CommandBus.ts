import { ICommand, ICommandHandlerResolver } from "contracts.ts";

export class CommandBus {
    constructor(private readonly handlerResolver: ICommandHandlerResolver) {}

    async dispatch<
        TCommand extends ICommand,
        TResult extends void | object = void,
    >(command: TCommand): Promise<TResult> {
        const handler = this.handlerResolver.resolve<TCommand, TResult>(
            command,
        );
        if (!handler) {
            throw new Error(
                `No handler found for command: ${command.constructor.name}`,
            );
        }
        return handler.execute(command);
    }
}
