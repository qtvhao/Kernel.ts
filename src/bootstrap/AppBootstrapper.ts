import 'reflect-metadata';
import { IServiceProvider } from 'contracts.ts';
import { IApplication } from 'contracts.ts';

export class AppBootstrapper {
  private readonly app: IApplication;
  private readonly providers: IServiceProvider[];

  constructor(app: IApplication, providers: IServiceProvider[]) {
    this.app = app;
    this.providers = providers;
  }

  public async bootstrap(): Promise<AppBootstrapper> {
    this.registerCore()
      .registerApplication()
      .registerDomain()
      .registerPersistence()
      .registerMessaging();

    await this.callBootingCallbacks();
    await this.bootProviders();
    await this.callBootedCallbacks();

    return this;
  }

  private registerCore(): AppBootstrapper {
    for (const provider of this.providers) {
      provider.register();
    }
    return this;
  }

  private async callBootingCallbacks(): Promise<void> {
    for (const provider of this.providers) {
      await provider.callBootingCallbacks();
    }
  }

  private async bootProviders(): Promise<void> {
    for (const provider of this.providers) {
      await provider.boot?.();
    }
  }

  private async callBootedCallbacks(): Promise<void> {
    for (const provider of this.providers) {
      await provider.callBootedCallbacks();
    }
  }

  private registerApplication(): AppBootstrapper {
    return this;
  }

  private registerDomain(): AppBootstrapper {
    return this;
  }

  private registerPersistence(): AppBootstrapper {
    return this;
  }

  private registerMessaging(): AppBootstrapper {
    return this;
  }

  public getApp(): IApplication {
    return this.app;
  }
}
