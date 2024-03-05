const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Models/UserModel");

//registration api
const registrationService = async (req, res) => {
  let { username, password, phone, address } = req.body;

  try {
    const existingUser = await User.findOne({ phone: phone });
    if (existingUser) {
      res.json({
        status: 400,
        message: "An account with this Phone no. already exists",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      const newUser = new User({
        username,
        password,
        phone,
        address,
      });
      await newUser
        .save()
        .then((data) => {
          res.json({
            status: 200,
            data: data,
            message: "Successfully Registered",
          });
        })
        .catch((error) => {
          res.json({
            status: 400,
            message: error,
          });
        });
    }
  } catch (error) {
    res.json({
      status: 400,
      message: error,
    });
  }
};

//login api
const loginService = async (req, res) => {
  let { phone, password } = req.body;
  console.log(req.body);
  const existingUser = await User.findOne({ phone: phone });
  if (!existingUser) {
    console.log("--------");
    console.log(existingUser);
    res.json({
      status: 400,
      message: "User doesnt exist, Please Register !",
    });
  } else {
    if (await bcrypt.compare(password, existingUser.password)) {
      const token = jwt.sign(
        {
          user: existingUser,
        },
        process.env.JWT_SECRET
      );
      res.json({
        status: 200,
        message: "Login Success",
        token: token,
        data: existingUser,
      });
    } else {
      res.json({
        status: 400,
        message: "Password mismatch",
      });
    }
  }
};

//get user details
const userDetailService = async (req, res) => {
  let { user_id } = req.body;
  console.log(req.body);
  const existingUser = await User.findOne({ _id: user_id });
  if (!existingUser) {
    console.log("--------");
    console.log(existingUser);
    res.json({
      status: 400,
      message: "User doesnt exist, Please Register !",
    });
  } else {
    res.json({
      existingUser
    });
  }
};

const getuserAddressService = async (req, res) => {
  let { user_id } = req.body;
  const existingUser = await User.findOne({ _id: user_id });
  if (existingUser) {
    res.json({
      status: 200,
      message: "Fetch successfull !",
      data: existingUser,
    });
  }
};

const updateAddressService = async (req, res) => {
  let { user_id, streetAddress, city, state, pincode } = req.body;
  console.log(streetAddress);
  console.log(city);
  console.log(state);
  console.log(pincode);
  try {
    const existingUser = await User.findOne({ _id: user_id });
    existingUser.streetAddress = streetAddress;
    existingUser.city = city;
    existingUser.state = state;
    existingUser.pincode = pincode;
    existingUser.address =
      streetAddress + ", " + city + ", " + state + " - " + pincode;

    const result = await existingUser.save();
    res.json(result);
  } catch (er) {
    res.json({ status: 400, message: er });
  }
};

module.exports = {
  registrationService,
  loginService,
  getuserAddressService,
  userDetailService,
  updateAddressService,
};
