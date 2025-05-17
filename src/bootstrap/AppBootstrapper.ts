import 'reflect-metadata';
import { Application as IApplication } from 'contracts.ts';

export class AppBootstrapper {
  private readonly app: IApplication;
  private readonly providers: any[];

  constructor(app: IApplication, providers: any[]) {
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
    for (const Provider of this.providers) {
      new Provider(this.app).register();
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
