const morgan = require("morgan");
const User = require("../model/user");

// create and save new user
exports.create = (req, res) => {
  // validate request
  console.log("Add USER=============================>>");

  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  //   console.log(req);

  const user = new User({
    email: req.body.email,
    votes: req.body.coin ? [{ coin: req.body.coin }] : [],
  });

  // save user in the database
  user
    .save(user)
    .then((data) => {
      res.send(data);
      // res.redirect('/add-coin');
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    User.findById(id)
      .then((data) => {
        console.log("GET user data ====>>" + JSON.stringify(data));
        if (!data) {
          res.status(404).send({ message: "Not found user with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Erro retrieving user with id " + id });
      });
  }
  if (req.query.email) {
    const email = req.query.email;

    User.find({})
      .where("email")
      .equals(email)
      .then((data) => {
        // console.log("GET user data ====>>" + data[0]);
        if (!data) {
          res.status(404).send({ message: "Not found user with id " + id });
        } else {
          res.send(data && data[0]);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Erro retrieving user with id " + id });
      });
  } else {
    User.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occurred while retriving user information",
        });
      });
  }
};

// Update a new idetified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  //   console.log(
  //     "UPDATE USER=============================>>" +
  //       JSON.stringify(req.body.votes[0])
  //   );

  const id = req.params.id;

  User.findByIdAndUpdate(
    { _id: id },
    { $push: { votes: req.body.votes[0] } },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. Maybe user not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Error Update user information" });
    });
};

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "Coin details was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Update a new idetified user by user id
exports.vote = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  var d = new Date();
  d.setSeconds(0, 0);
  d.setHours(0);
  d.setMinutes(0);
  console.log("------Date Now----" + d.toUTCString());

  const id = req.params.id;
  //   console.log("------request----" + JSON.stringify(req));
  User.findByIdAndUpdate(
    { _id: id, "votes.coin": req.body.coin },
    {
      $set: {
        "votes.$[].votedAt": d.toUTCString(),
      },
    }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. Maybe user not found!`,
        });
      } else {
        // console.log("------response----" + JSON.stringify(data));
        res.send(data);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Error Update user information" });
    });
};
