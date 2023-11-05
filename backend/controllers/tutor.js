import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerTotor = (req, res) => {
  //CHECK USER IF EXISTS

  const q = "SELECT * FROM tutors WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Totor already exists!");
    //CREATE A NEW USERA
    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
    'INSERT INTO tutors (email, password, name, expertise, experience, subject, price, phone, account , bankNumber, bankName) VALUE (?)';
    const values = [
      req.body.email,
      hashedPassword,
      req.body.name,
      req.body.expertise,
      req.body.experience,
      req.body.subject,
      req.body.price,
      req.body.phone,
      req.body.account,
      req.body.bankNumber,
      req.body.bankName,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Totor has been created.");
    });
  });
};




export const loginTotor = (req, res) => {
  const q = "SELECT * FROM tutors WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Tutor not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");

    const token = jwt.sign({ id: data[0].id }, "secretkey");
    const { password, ...others } = data[0];
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logoutTotor = (req, res) => {
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  }).status(200).json("User has been logged out.")
};