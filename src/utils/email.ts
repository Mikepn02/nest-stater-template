import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import config from 'src/config';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export class emailUtil {
  private static transporter = nodemailer.createTransport({
    host: config().mail.host,
    port: Number(config().mail.port) || 587,
    secure: false,
    auth: {
      user: config().mail.user,
      pass: config().mail.pass,
    },
  });

  static async sendEmail({ to, subject, html }: EmailOptions) {
    try {
      const info = await this.transporter.sendMail({
        from: 'Starter Template <starter@example.com>',
        to,
        subject,
        html,
      });
      console.log('Email sent: %s', info.messageId);
      return true;
    } catch (error) {
      console.error('Email sending error:', error);
      return false;
    }
  }

  static async sendPasswordResetEmail(to: string, resetLink: string) {
    try {
      const templatePath = path.join(
        process.cwd(),
        'src',
        'utils',
        'templates',
        'reset-password.html',
      );
      let template = fs.readFileSync(templatePath, 'utf-8');

      template = template.replace('{{RESET_LINK}}', resetLink);

      return await this.sendEmail({
        to,
        subject: 'Password Reset Request',
        html: template,
      });
    } catch (error) {
      console.error('Reset email error:', error);
      return false;
    }
  }
}
