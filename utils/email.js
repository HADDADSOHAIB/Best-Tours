const nodemailer=require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor(user, url){
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = 'Haddad Sohaib <dev.haddad@gmail.com>'
    }

    createTransport(){
        if(process.env.NODE_ENV === 'production'){
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth:{
                    user:process.env.SENDGRID_USERNAME,
                    pass:process.env.SENDGRID_PASSWORD
                }
            });
        }
        
        return nodemailer.createTransport({
            host:process.env.EMAIL_HOST,
            port:process.env.EMAIL_PORT,
            auth:{
                user:process.env.EMAIL_USERNAME,
                pass:process.env.EMAIL_PASSWORD
            }
        });
    }

    async send(templete, subject){
        const html = pug.renderFile(`${__dirname}/../views/emails/${templete}.pug`,
            {
                firstName: this.firstName,
                url: this.url,
                subject
            });

        const mailOptions={
            from: this.from,
            to:this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        }

        await this.createTransport().sendMail(mailOptions);
    }

    async sendWelcome(){
        await this.send('welcome', 'welcome to the best tours family');
    }

    async sendPasswordRest(){
        await this.send('passwordReset', 'Rest your password, valid for 10min!!');
    }
}