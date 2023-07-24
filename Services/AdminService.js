const Issue = require("../Models/IssueModel");
const Admin = require("../Models/AdminModel");

const adminLogin =async(req,res) => {
  let { user_name , user_password } = req.body;
  const existingAdmin = await Admin.findOne({ user_name:user_name,user_password:user_password });
  if (!existingAdmin) {
    res.json({
      status: 400,
      message: "Invalid User or password",
    });
  } else {
    res.json({
      status: 200,
      message: "Login Success",
    });
  } 
  // const newUser = new Admin({
  //   user_name,
  //   user_password,
  // });
  // await newUser
  //   .save()
  //   .then((data) => {
  //     res.json({
  //       status: 200,
  //       data: data,
  //       message: "Successfully Registered",
  //     });
  //   })
  //   .catch((error) => {
  //     res.json({
  //       status: 400,
  //       message: error,
  //     });
  //   });
};

const getAdminIssues = async (req, res) => {
  await Issue.find({})
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

const updateIssue = async (req, res) => {
  const issue = await Issue.findOne({ token: req.body?.token });
  if (!issue) {
    return res.status(204).json({ "message": `No student matches ID ${req.body.token}.` });
  }
  if (req.body?.token) {
    if (req.body?.issueResolved == "Yes")
      issue.issueResolved = "Yes";
    else
      issue.issueResolved = "No";
  }
  const result = await issue.save();
  res.json(result);
}

const sendIssue = async (req, res) => {
  const issue = await Issue.findOne({ token: req.body?.token });
  if (!issue) {
    return res.status(204).json({ "message": `No student matches ID ${req.body.token}.` });
  }
  res.json(issue);
}


module.exports = { getAdminIssues,adminLogin,updateIssue,sendIssue };
