import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, maxLength: 50, unique: true },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    firstName: { type: String, required: true, minLength: 2 },
    lastName: { type: String, required: true, minLength: 2 },
    profilePicture: { type: String, default: "" },
    birthday: { type: Date },
    country: { type: String, minLength: 3 },
    bio: { type: String, minLength: 10 },
    active: { type: Boolean, default: true },
    onlineStatus: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = [
    "email",
    "password",
    "firstName",
    "lastName",
    "profilePicture",
    "birthday",
    "country",
    "bio",
    "active",
    "onlineStatus",
    "role",
    "followers",
    "following",
  ];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }
  if (userObject.email == null) {
    errorList.push("email is a required field");
  }
  if (userObject.password == null) {
    errorList.push("password is a required field");
  }
  if (userObject.firstName == null) {
    errorList.push("first name is a required field");
  }
  if (userObject.lastName == null) {
    errorList.push("last name is a required field");
  }
  if (userObject.birthday == null) {
    errorList.push("birthday is a required field");
  }
  if (userObject.country == null) {
    errorList.push("country is a required field");
  }
  if (userObject.bio == null) {
    errorList.push("bio is a required field");
  }

  return errorList;
};

export default User;
