const express= require('express');
const Router=express.Router();
const userService=require('../Services/UserService');
const adminService=require('../Services/AdminService')
const VerifyToken=require('../Utils/verifyToken');
const emailService=require('../Services/EmailService');

Router.post('/register',userService.registrationService);
Router.post('/login',userService.loginService);
Router.post('/studentinfo',userService.insertStudent);
Router.post('/getuser',VerifyToken.verifyToken,userService.getUserList);
Router.post('/issues',userService.issueService);
Router.post('/findissues',userService.findAllIssues);
Router.post('/adminlogin',adminService.adminLogin);
Router.post('/getadminissues',adminService.getAdminIssues);
Router.post('/updateissue',adminService.updateIssue);
Router.post('/sendemail', emailService.sendEmail);
Router.post('/getissue', adminService.sendIssue);

module.exports=Router; 