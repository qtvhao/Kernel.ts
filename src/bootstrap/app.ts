import path from "path";
import { Application } from "../Infrastructure/Kernel/Application";

export const app = new Application(
    {
        base: path.resolve(__dirname, "../"), // Project root
        config: path.resolve(__dirname, "../Config"), // Configuration files
        database: path.resolve(__dirname, "../Database"), // Database files or migrations
        resources: path.resolve(__dirname, "../Resources"), // Views, translations, etc.
        storage: path.resolve(__dirname, "../Storage"), // Logs, cache, etc.
        lang: path.resolve(__dirname, "../Resources/lang"), // Language files
        public: path.resolve(__dirname, "../../public"), // Publicly served assets
    },
    "production",
    true,
    "vi-VN",
);
