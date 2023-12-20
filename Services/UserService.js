const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//const User = require("../Models/RegistrationModel");
const User = require("../Models/UserModel");
const Student = require("../Models/StudentModel");
const Issue = require("../Models/IssueModel");

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
//userinert api
const insertStudent = async (req, res) => {
  const { rollNo, student_name, student_year, student_room, student_email } =
    req.body;
  // const existingUser=await User.findOne({rollNo:rollNo});
  // if(existingUser){
  const student_info = new Student({
    rollNo,
    student_name,
    student_year,
    student_room,
    student_email,
  });
  await student_info
    .save()
    .then((data) => {
      res.json({
        status: 200,
        data: data,
        message: "Student Record Inserted Successfully",
      });
    })
    .catch((error) => {
      res.json({
        status: 401,
        message: error,
      });
    });
  // }else{
  //     res.json({
  //         status:400,
  //         message:"Employee Record not found"
  //     })
  //}
};

//get student info api
const getUserList = async (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, auth) => {
    if (err) {
      res.json({
        status: 400,
        message: "Invalid Token",
        error: err,
      });
    } else {
      const existingUser = await Student.findOne({ rollNo: auth.user.rollNo });
      if (existingUser) {
        await Student.findOne({ rollNo: auth.user.rollNo }, {})
          .then((data) => {
            res.json({
              status: 200,
              data: data,
            });
          })
          .catch((error) => {
            res.json({ status: 400, message: error });
          });
      } else {
        res.json({
          status: 401,
          message: "No Record",
        });
      }
    }
  });
};

//create and store issue
const issueService = async (req, res) => {
  const {
    rollNo,
    department,
    detail,
    issueDate,
    preferredDate,
    issueResolved,
    preferredTimeTo,
    preferredTimeFrom,
    token,
    //expireAt,
  } = req.body;
  if (!rollNo || !token)
    return res.status(400).json({ message: "Roll No and Token ID required." });

  // check for duplicate studentnames in the db
  const duplicate = await Issue.findOne({
    rollNo: rollNo,
    detail: detail,
    issueDate: issueDate,
  }).exec();

  if (duplicate) return res.sendStatus(409); //Conflict
  const issue_result = new Issue({
    rollNo,
    department,
    detail,
    issueDate,
    preferredDate,
    issueResolved,
    preferredTimeTo,
    preferredTimeFrom,
    token,
    //expireAt,
  });

  await issue_result
    .save()
    .then((data) => {
      //Issue.createIndex({ "expireAt": 1 }, { expireAfterSeconds: 60 })
      res.json({
        status: 200,
        data: data,
        // message: "Student Issue Record Inserted Successfully",
      });
    })
    .catch((error) => {
      res.json({
        status: 401,
        message: error,
      });
    });
};

//find all issue
const findAllIssues = async (req, res) => {
  //console.log(req.body);
  const { rollNo } = req.body;
  await Issue.find({ rollNo: rollNo }, {})
    .then((data) => {
      res.json({
        status: 200,
        data: data,
      });
    })
    .catch((error) => {
      res.json({ status: 400, message: error });
    });
};

module.exports = {
  registrationService,
  loginService,
  getuserAddressService,
  userDetailService,
  updateAddressService,
};
