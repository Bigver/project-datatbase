import { db } from "../connect.js";
import jwt from "jsonwebtoken";



export const updateUser = (req, res) => {

  const q =
      "UPDATE users SET `name`=?,`phone`=? WHERE id=? ";

    db.query(
      q,
      [
        req.body.name,
        req.body.phone,
        req.body.id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );

};


