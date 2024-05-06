import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { User } from "src/auth/user/entities/user.entity";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendCodeEmail(code: string, data: User) {
    const config = new ConfigService();
    var contents = `<div
                      style="
                        background-color: #ffffff;
                        border: 1px solid #e0e4e6;
                        padding: 40px;
                        padding-bottom: 52px;
                        padding-top: 41px;
                        border-radius: 10px;
                        margin-right: 25%;
                        margin-left: 25%;
                      ">`;
    contents =
      contents +
      `<div>
        <p style="font-size: 16px"><b>Hi, ${data.firstname}</b></p>
        <div style="">
          <p>We received a request to reset your Barangay System Password.</p>
          <p>Enter the following password reset code:</p>
          <p style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;
                    font-size:16px;
                    line-height:21px;
                    color:#141823">
          
                    <b>${code}</b>
          </p>
        </div>
      </div>`;
    await this.mailerService.sendMail({
      to: data.mobile_email,
      from: config.get<string>("MAIL_FROM"),
      subject: "Reset Code",
      html: contents + ".",
      template: "forwardmail",
    });
  }
}
