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

  public bootstrap(): AppBootstrapper {
    this.registerCore()
      .registerApplication()
      .registerDomain()
      .registerPersistence()
      .registerMessaging();

    this.callBootingCallbacks();
    this.bootProviders();
    this.callBootedCallbacks();

    return this;
  }

  private registerCore(): AppBootstrapper {
    for (const provider of this.providers) {
      provider.register();
    }
    return this;
  }

  private callBootingCallbacks(): void {
    for (const provider of this.providers) {
      provider.callBootingCallbacks();
    }
  }

  private bootProviders(): void {
    for (const provider of this.providers) {
      provider.boot?.();
    }
  }

  private callBootedCallbacks(): void {
    for (const provider of this.providers) {
      provider.callBootedCallbacks();
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
