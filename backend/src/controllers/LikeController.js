const Dev = require("../models/Dev");

module.exports = {
  async store(req, res) {
    console.log(req.params.devId);
    const { devId } = req.params;

    console.log(req.headers.user);
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ error: "Dev not exists" });
    }

    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};
