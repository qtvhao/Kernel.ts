import { IConfigurationService } from "contracts.ts";

export class ConfigurationService implements IConfigurationService {
    getEventBusDriver(): string {
        return process.env.EVENT_BUS_DRIVER || "inmemory";
    }

    getKafkaBrokers(): string[] {
        this.ensureKafkaVar("KAFKA_BROKERS");
        const brokers = process.env.KAFKA_BROKERS;
        return brokers ? brokers.split(",") : [];
    }

    getKafkaClientId(): string {
        this.ensureKafkaVar("KAFKA_CLIENT_ID");
        return process.env.KAFKA_CLIENT_ID || "";
    }

    getKafkaGroupId(): string {
        this.ensureKafkaVar("KAFKA_GROUP_ID");
        return process.env.KAFKA_GROUP_ID || "";
    }

    private ensureKafkaVar(envVar: string): void {
        if (this.getEventBusDriver() === "kafka" && !process.env[envVar]) {
            throw new Error(`${envVar} must be set for Kafka driver`);
        }
    }
}
