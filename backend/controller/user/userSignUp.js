const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function unseSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      throw new Error("Already user exits");
    }
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide email");
    }
    if (!name) {
      throw new Error("Please provide email");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Creating hash using password error found.");
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created Successfully",
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = unseSignUpController;
