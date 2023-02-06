import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //CHECK EXSISTING USER
  const q = "SELECT * FROM users WHERE email = ? OR username = ?"; //q is query

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exist!!!"); //means data alrdy exist

    // HASH the password and create user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [
      req.body.username, //user name express
      req.body.email,
      hash, //hash password
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created."); //means successful
    });
  });
}; // npm i bcryptjs to hide password
export const login = (req, res) => {
  //CHECK USER
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (data.length === 0) return res.status(404).json("User not found!"); /// if 0 means dont have the user
    //CHECK PASSWORD
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    ); //returns array so using first item in the array
    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");
    const token = jwt.sign({ id: data[0].id }, "jwtkey"); // for unique webtoken to store id in cookie USER ID!!!!!!
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true, //means only api request can access cookie
      })
      .status(200)
      .json(other); //so only other info is sent not password
  });
};
export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
