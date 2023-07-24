const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Models/RegistrationModel");
const Student = require("../Models/StudentModel");
const Issue = require("../Models/IssueModel");

//registration api
const registrationService = async (req, res) => {
  let { firstName, lastName, rollNo, password } = req.body;
  try {
    const existingUser = await User.findOne({ rollNo: rollNo });
    if (existingUser) {
      res.json({
        status: 400,
        message: "An account with this roll no already exists",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      const newUser = new User({
        firstName,
        lastName,
        rollNo,
        password,
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
  let { rollNo, password } = req.body;
  const existingUser = await User.findOne({ rollNo: rollNo });
  if (!existingUser) {
    res.json({
      status: 400,
      message: "User doesnt exist please Register",
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
      });
    } else {
      res.json({
        status: 400,
        message: "Password mismatch",
      });
    }
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
  insertStudent,
  getUserList,
  issueService,
  findAllIssues,
};
