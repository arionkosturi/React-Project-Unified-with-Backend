const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Users = require("../models/users");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.find({ username: username });
    if (!user)
      return res.status(500).json({
        message: "User doesn't exist! 😢",
        type: "error",
      });

    const isMatch = await compare(password, Users.password);
    if (!isMatch)
      return res.status(500).json({
        message: "Password is incorrect! ⚠️",
        type: "error",
      });

    await user.save();
  } catch (error) {
    console.log("Error: ", error);

    res.status(500).json({
      type: "error",
      message: "Error signing in!",
      error,
    });
  }
});

// ALL Published
// router.get("/", (req, res, next) => {
//   Users.find()
//     .sort()
//     .skip()
//     .limit()
//     .exec()
//     .then((docs) => {
//       // console.log(docs);

//       res.status(200).json(docs);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });
// router.post("/", (req, res, next) => {
//   const user = new Users({
//     _id: new mongoose.Types.ObjectId(),
//     username: req.body.username,
//     password: req.body.password,
//     isAdmin: req.body.isAdmin,
//     isLoggedIn: req.body.isLoggedIn,
//   });
//   user
//     .save()
//     .then((result) => {
//       console.log(result);
//       res.status(201).json({
//         message: "User was created",
//         createdUser: result,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

// app.use("/login", (req, res) => {
//   res.send({
//     user: {
//       username: "admin",
//       password: "admin",
//     },
//   });
// });

// module.exports = router;
