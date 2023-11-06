import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ITelegramOptionsModuleAsyncOptions } from './telegram.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';


@Global()
@Module({})
export class TelegramModule {
  static foRootAsync(options: ITelegramOptionsModuleAsyncOptions): DynamicModule {
    const asyncOptions = this.createAsyncoptionsProvider(options);
    return {
      module: TelegramModule,
      imports: options.imports,
      providers: [TelegramService, asyncOptions],
      exports: [TelegramService]
    }
  }
  private static createAsyncoptionsProvider(options: ITelegramOptionsModuleAsyncOptions): Provider {
    return {
      provide: TELEGRAM_MODULE_OPTIONS,
      useFactory: async (...args: any[]) => {
        const config = await options.useFactory(...args);
        return config;
      },
      inject: options.inject || []
    }
  }
}
