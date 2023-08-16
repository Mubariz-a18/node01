const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { createJwtToken } = require('../Utils/JsonWebToken');

module.exports.register = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password
    } = req.body;
    // Check if the email is already registered
    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return res.json({ message: 'Username already used', status: false });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: 'Email already registered', status: false });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });
    const token = await createJwtToken(email,newUser._id);

    res.status(201).json({ message: 'User registered successfully', status: true, token:token });
  } catch (error) {
    next(error)
  }
}


module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ message: 'User not found', status: false });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ message: 'Invalid credentials', status: false });
    }

    const token = await createJwtToken(user.email,user._id);

    res.status(200).json({ token, status: true });
  } catch (error) {
    next(error);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate({ _id: userId }, {
      $set: {
        isAvatarImageSet: true,
        avatarImage:avatarImage
      }
    });
    console.log({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage
    });
  } catch (error) {
    next(error)
  }
}
