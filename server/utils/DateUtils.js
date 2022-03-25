import moment from "moment";

module.exports = {
  getCurrenDate: function () {
    // console.log("Inside Generate token--------------" + moment().local());
    return moment().local();
  },
  sendToken: function (req, res) {
    // console.log("Inside Send token--------------" + req);
    res.setHeader("x-auth-token", req.token);
    return res.status(200).send(JSON.stringify(req.user));
  },
};
