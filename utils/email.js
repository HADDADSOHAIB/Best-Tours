const nodemailer=require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor(user, url, options = {}){
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = 'Best Tours Agency | CEO Sohaib Haddad <dev.haddad@gmail.com>'
        this.options = options;
    }

    createTransport(){
        return nodemailer.createTransport({
            service: 'sendgrid',
            auth:{
                user: process.env.SENDGRID_USERNAME,
                pass: process.env.SENDGRID_PASSWORD
            }
        });
    }

    async send(templete, subject){
        const html = pug.renderFile(`${__dirname}/../views/emails/${templete}.pug`,
            {
                firstName: this.firstName,
                url: this.url,
                subject,
                options: this.options
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

    async sendTourBooked(){
        await this.send('tourBooked', 'Congratulation, your tour is booked successfully');
    }

    async sendTourNotBooked(){
        await this.send('tourNotBooked', 'Tour Not Booked, Contact Us');
    }
}