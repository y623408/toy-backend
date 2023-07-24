const express = require('express');
const nodemailer = require('nodemailer');

// Replace these with your email service credentials
// Function to send an email
const sendEmail = (req, res) => {

    const emailConfig = {
        service: 'gmail',
        auth: {
            user: 'ananyapandey2322001@gmail.com',
            pass: 'ftlwtynfzhfoorov',
        },
    };

    const transporter = nodemailer.createTransport(emailConfig);

    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: emailConfig.auth.user,
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text,
            html: req.body.html
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                // console.log('Email sent: ' + info.response);
                resolve(info.response);
            }
        });
        res.json();
    });
};

module.exports = { sendEmail };