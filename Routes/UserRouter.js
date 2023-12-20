const express= require('express');
const Router=express.Router();
const userService=require('../Services/UserService');
const toyService=require('../Services/ToyService');
const adminService=require('../Services/AdminService')
const VerifyToken=require('../Utils/verifyToken');
const emailService=require('../Services/EmailService');

Router.post('/register',userService.registrationService);
Router.post('/login',userService.loginService);
Router.post('/getAddress',userService.getuserAddressService);
Router.post('/getUserData',userService.userDetailService);
Router.post('/updateAddress',userService.updateAddressService);

Router.post('/addtoy',toyService.addToyService);
Router.post('/getalltoys',toyService.getAllToysService);
Router.post('/getusertoys',toyService.getUserToysService);
Router.post('/gettoydetail',toyService.getToyDetailService);
Router.post('/updatestatus',toyService.updateToyStatus);

Router.post('/adminlogin',adminService.adminLogin);
Router.post('/getadminissues',adminService.getAdminIssues);

Router.post('/updateissue',adminService.updateIssue);
Router.post('/sendemail', emailService.sendEmail);
Router.post('/getissue', adminService.sendIssue);

module.exports=Router;
