import { ConfigModule, ConfigService } from "@nestjs/config";
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from "@nestjs/typeorm";
//create class
export default class TypeOrmConfig {
  //function declaration
  static getOrmConfig(config: ConfigService): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: config.get<string>("DB_HOST"),
      port: config.get<number>("DB_PORT"),
      username: config.get<string>("DB_USER"),
      password: config.get<string>("DB_PASSWORD"),
      database: config.get<string>("DB_NAME"),
      entities: ["dist/**/*.entity{.ts,.js}"],
      
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}

export const TypeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => {
    const tConfig = TypeOrmConfig.getOrmConfig(config);
    return tConfig;
  },
  inject: [ConfigService],
};

export const migrationConfig = (
  config: ConfigService
): TypeOrmModuleOptions => {
  return TypeOrmConfig.getOrmConfig(config);
};
