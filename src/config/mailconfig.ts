import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

export const mailConfigAsync: MailerAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    // transport: config.get("MAIL_TRANSPORT"),
    // or
    transport: {
      service: 'gmail',
      auth: {
        user: configService.get<string>('GMAIL_SERVICE_EMAIL'),
        pass: configService.get<string>('GMAIL_SERVICE_PASS'),
      },

      // host: config.get('MAIL_HOST'),
      // secure: false,
    },
    defaults: {
      from: `"No Reply" <${configService.get('GMAIL_SERVICE_EMAIL')}>`,
      // to: email,
      // subject: 'Hello',
      // html: `<h1>this is a test mail.<a href>Confirm here</a></h1>`,
    },
    template: {
      dir: join(__dirname, 'templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
  inject: [ConfigService],
};
