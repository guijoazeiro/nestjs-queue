import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'Mail',
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: process.env.FROM_MAIL,
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
