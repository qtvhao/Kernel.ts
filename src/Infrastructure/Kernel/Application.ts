import {
    Container,
    BindingIdentifier,
    BindToFluentSyntax,
    GetOptions,
    OptionalGetOptions,
    ServiceIdentifier
} from "inversify";
import { Application as ApplicationContract } from 'contracts.ts'
import { ServiceProvider } from 'support.ts'

export class Application implements ApplicationContract {
    private container = new Container();
    private callbacks = {
        terminating: [] as Array<() => void | Promise<void>>,
        booting: [] as Array<() => void | Promise<void>>,
    };

    constructor(
        private readonly paths: {
            base: string;
            config: string;
            database: string;
            resources: string;
            storage: string;
            lang: string;
            public: string;
        },
        private env: string,
        private debug: boolean,
        private locale: string
    ) {}

    bind<T>(serviceIdentifier: ServiceIdentifier<T>): BindToFluentSyntax<T> {
        return this.container.bind(serviceIdentifier);
    }

    get<T>(serviceIdentifier: ServiceIdentifier<T>, options?: GetOptions | OptionalGetOptions): T | undefined {
        if ((options as OptionalGetOptions)?.optional) {
            return this.container.isBound(serviceIdentifier) ? this.container.get(serviceIdentifier) : undefined;
        }
        return this.container.get(serviceIdentifier);
    }

    getAll<T>(serviceIdentifier: ServiceIdentifier<T>, options?: GetOptions): T[] {
        return this.container.getAll(serviceIdentifier);
    }

    async getAllAsync<T>(serviceIdentifier: ServiceIdentifier<T>, options?: GetOptions): Promise<T[]> {
        return this.getAll(serviceIdentifier, options);
    }

    async getAsync<T>(serviceIdentifier: ServiceIdentifier<T>, options?: GetOptions | OptionalGetOptions): Promise<T | undefined> {
        return this.get(serviceIdentifier, options);
    }

    async rebind<T>(serviceIdentifier: ServiceIdentifier<T>): Promise<BindToFluentSyntax<T>> {
        this.container.unbind(serviceIdentifier);
        return this.bind(serviceIdentifier);
    }

    rebindSync<T>(serviceIdentifier: ServiceIdentifier<T>): BindToFluentSyntax<T> {
        this.container.unbind(serviceIdentifier);
        return this.bind(serviceIdentifier);
    }

    async unbind(identifier: BindingIdentifier | ServiceIdentifier): Promise<void> {
        this.container.unbind(identifier);
    }

    async unbindAll(): Promise<void> {
        this.container.unbindAll();
    }

    unbindSync(identifier: BindingIdentifier | ServiceIdentifier): void {
        this.container.unbind(identifier);
    }

    basePath(): string { return this.paths.base; }
    configPath(): string { return this.paths.config; }
    databasePath(): string { return this.paths.database; }
    resourcesPath(): string { return this.paths.resources; }
    storagePath(): string { return this.paths.storage; }
    langPath(): string { return this.paths.lang; }
    publicPath(): string { return this.paths.public; }

    environment(): string {
        return this.env;
    }

    isLocal(): boolean {
        return this.env === "local";
    }

    isProduction(): boolean {
        return this.env === "production";
    }

    isTesting(): boolean {
        return this.env === "testing";
    }

    runningInConsole(): boolean {
        return typeof process !== "undefined" && !!process.stdout && !!process.stdin;
    }

    hasDebugModeEnabled(): boolean {
        return this.debug;
    }

    register(provider: ServiceProvider): void {
        provider.register();
    }

    async boot(): Promise<void> {
        for (const callback of this.callbacks.booting) {
            await callback();
        }
    }

    resolveProvider<T>(provider: ServiceProvider): T {
        return provider as unknown as T;
    }

    getLocale(): string {
        return this.locale;
    }

    setLocale(locale: string): void {
        this.locale = locale;
    }

    async terminate(): Promise<void> {
        for (const callback of this.callbacks.terminating) {
            await callback();
        }
    }

    terminating(callback: () => Promise<void> | void): void {
        this.callbacks.terminating.push(callback);
    }

    booting(callback: () => Promise<void> | void): void {
        this.callbacks.booting.push(callback);
    }
}
