import 'reflect-metadata';
import { IServiceProvider } from 'contracts.ts';
import { Application as IApplication } from 'contracts.ts';

export class AppBootstrapper {
  private readonly app: IApplication;
  private readonly providers: IServiceProvider[];

  constructor(app: IApplication, providers: IServiceProvider[]) {
    this.app = app;
    this.providers = providers;
  }

  public bootstrap(): AppBootstrapper {
    return this
      .registerCore()
      .registerApplication()
      .registerDomain()
      .registerPersistence()
      .registerMessaging();
  }

  private registerCore(): AppBootstrapper {
    for (const providerInstance of this.providers) {
      providerInstance.register();
      providerInstance.callBootingCallbacks?.();
      providerInstance.callBootedCallbacks?.();
    }
    return this;
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
