import { Module } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { UserModule } from "./auth/user/user.module";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TransformInterceptor } from "./interceptors/response-interceptor";
import { TypeOrmConfigAsync } from "configuration/TypeormConfig";
import { AuditTrailModule } from './audit-trail/audit-trail.module';
import { BarangayEmployeeModule } from './barangay_employee/barangay_employee.module';
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfigAsync),
    UserModule,
    AuthModule,
    SwaggerModule,
    // MailerModule.forRoot({
    //   transport: {
    //     host: process.env.EMAIL_HOST,
    //     auth: {
    //       user: process.env.EMAIL_USERNAME,
    //       pass: process.env.EMAIL_PASSWORD,
    //     },
    //   },
    // }),
    // setup sides


    // logs side
    AuditTrailModule,
    BarangayEmployeeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
