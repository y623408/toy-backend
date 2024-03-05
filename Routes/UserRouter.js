const express= require('express');
const Router=express.Router();
const userService=require('../Services/UserService');
const toyService=require('../Services/ToyService');

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

module.exports=Router;
