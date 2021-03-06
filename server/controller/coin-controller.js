const morgan = require("morgan");
var Coin = require("../model/coin");

// create and save new user
exports.create = (req, res) => {
  // validate request

  // console.log("Add USER");

  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }
  // console.log(req);
  const coin = new Coin({
    name: req.body.name,
    logo: req.body.logo,
    chain: req.body.chain,
    presale: req.body.presale,
    coinType: req.body.coinType,
    description: req.body.description,
    contAddress: req.body.contAddress,
    launchDt: req.body.launchDt,
    marketCap: req.body.marketCap,
    price: req.body.price,
    telegram: req.body.telegram,
    twitter: req.body.twitter,
    reddit: req.body.reddit,
    discord: req.body.discord,
    otherChains: req.body.otherChains,
    dexToools: req.body.dexToools,
    swap: req.body.swap,
    vote: req.body.vote,
    symbol: req.body.symbol,
  });

  // save user in the database
  coin
    .save(coin)
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

    Coin.findById(id)
      .then((data) => {
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
  if (req.query.name) {
    const name = req.query.name;
    Coin.find({})
      .where("name")
      .equals(name)
      .then((data) => {
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
    Coin.find()
      .then((coin) => {
        res.send(coin);
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

  const id = req.params.id;
  Coin.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
      res.status(500).send({ message: "Error Update user information" });
    });
};

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Coin.findByIdAndDelete(id)
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

  const id = req.params.id;
  Coin.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
      res.status(500).send({ message: "Error Update user information" });
    });
};
