import { IConfigurationService } from "contracts.ts";

export class ConfigurationService implements IConfigurationService {
    getEventBusDriver(): string {
        return process.env.EVENT_BUS_DRIVER || "inmemory";
    }
}
