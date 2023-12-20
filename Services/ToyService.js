const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Toy = require("../Models/ToyModel");

const addToyService = async (req, res) => {
  let { user_id, toyname, description, pic, price, rating, quantity, status } =
    req.body;

  console.log("Entered for work");
  /* const unique_id =  await Toy.count({}).then(count => {
        return count;
    }) + 1;
    console.log(unique_id);
 */
  try {
    const existingToy = await Toy.findOne({
      user_id: user_id,
      toyname: toyname,
      description: description,
    });
    if (existingToy) {
      res.json({
        status: 400,
        message: "This toy has already been added.",
      });
    } else {
      //const salt = await bcrypt.genSalt(10);
      //password = await bcrypt.hash(password, salt);
      const newToy = new Toy({
        user_id,
        toyname,
        description,
        pic,
        price,
        rating,
        quantity,
        status,
      });
      await newToy
        .save()
        .then((data) => {
          res.json({
            status: 200,
            data: data,
            message: "Toy Added Successfully !!!",
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

const getAllToysService = async (req, res) => {
  let { user_id, status } = req.body;
  console.log("Get All Toys Called");
  try {
    const toys = await Toy.find({ status: status, user_id: { $ne: user_id } });
    console.log(toys);
    if (toys) {
      res.json({
        status: 200,
        data: toys,
      });
    } else {
      res.json({
        status: 400,
        message: "No toys have been added yet !",
      });
    }
  } catch (error) {
    res.json({
      status: 400,
      message: error,
    });
  }
};

const getUserToysService = async (req, res) => {
  let { user_id, status } = req.body;
  try {
    const toys = await Toy.find({ user_id: user_id, status: status });
    if (toys) {
      res.json({
        status: 200,
        data: toys,
      });
    } else {
      res.json({
        status: 400,
        message: "No toys found !",
      });
    }
  } catch (error) {
    res.json({
      status: 400,
      message: error,
    });
  }
};

const getToyDetailService = async (req, res) => {
  let { user_id, _id } = req.body;
  console.log("Entered to take out your toy");
  try {
    const existingToy = await Toy.findOne({ _id: _id });
    if (existingToy) {
      res.json({
        status: 200,
        data: existingToy,
      });
    } else {
      res.json({
        status: 400,
        message: "Toy Not Found !",
      });
    }
  } catch (error) {
    res.json({
      status: 400,
      message: error,
    });
  }
};

const updateToyStatus = async (req, res) => {
  let { toy_id } = req.body;

  try {
    const toy = await Toy.findOne({ _id: toy_id });

    if (toy) {
      if (toy.status == "exchange-a") toy.status = "exchange-i";
      else if ((toy.status = "exchange-i")) toy.status = "exchange-a";

      const result = await toy.save();
      
    res.json({
      status : 200,
      message : "Toy Marked for Exchange !",
      data : result
    });
    }
  } catch (er) {
    console.log(er);
  }
};
module.exports = {
  addToyService,
  getAllToysService,
  getUserToysService,
  getToyDetailService,
  updateToyStatus,
};
