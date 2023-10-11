import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc     Auth User and get tomen
// @route    POST /api/users/login
// @access   Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
      isAthlete: user.isAthlete,
      isCoach: user.isCoach,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc     Register user
// @route    POST /api/users
// @access   Public

export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, isAthlete, isCoach, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    isAthlete,
    isCoach,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAthlete: user.isAthlete,
      isCoach: user.isCoach,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc     Singn up/in with google
// @route    POST /api/users
// @access   Public
export const google = asyncHandler(async (req, res) => {
  console.log("inside the google controller");
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      generateToken(res, user._id);

      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
        isAthlete: user.isAthlete,
        isCoach: user.isCoach,
        isAdmin: user.isAdmin,
        avatar: user.avatar,
      });
    } else {
      console.log("no user");
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: generatedPassword,
        avatar: req.body.photo,
      });

      if (user) {
        generateToken(res, user._id);

        res.status(201).json({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAthlete: user.isAthlete,
          isCoach: user.isCoach,
          isAdmin: user.isAdmin,
          avatar: user.avatar,
        });
      }
    }
  } catch (err) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc     Logout user / clear cookie
// @route    Post /api/users/logout
// @access   Private
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});
