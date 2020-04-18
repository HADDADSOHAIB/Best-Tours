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
                    user: 'apikey',
                    pass: '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'
                }
            });
        }

        return nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'dev.haddad@gmail.com',
                pass: process.env.EMAILP
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
        
        this.createTransport().sendMail(mailOptions)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    async sendWelcome(){
        await this.send('welcome', 'welcome to the best tours family');
    }

    async sendPasswordRest(){
        await this.send('passwordReset', 'Rest your password, valid for 10min!!');
    }
}