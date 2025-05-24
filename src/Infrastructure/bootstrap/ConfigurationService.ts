import { IConfigurationService } from "contracts.ts";
import dotenv from "dotenv";

dotenv.config();

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

    getSupabaseUrl(): string {
        this.ensureSupabaseVar("SUPABASE_URL");
        return process.env.SUPABASE_URL!;
    }

    getSupabaseKey(): string {
        this.ensureSupabaseVar("SUPABASE_KEY");
        return process.env.SUPABASE_KEY!;
    }

    private ensureKafkaVar(envVar: string): void {
        if (this.getEventBusDriver() === "kafka" && !process.env[envVar]) {
            throw new Error(`${envVar} must be set for Kafka driver`);
        }
    }

    private ensureSupabaseVar(envVar: string): void {
        if (this.getEventBusDriver() === "supabase" && !process.env[envVar]) {
            throw new Error(`${envVar} must be set for Supabase driver`);
        }
    }
}
