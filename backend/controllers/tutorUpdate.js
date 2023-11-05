import { db } from "../connect.js";
import jwt from "jsonwebtoken";


export const updateTutor = (req, res) => {

    const q =
        "UPDATE tutors SET `name`=?,`expertise`=?,`experience`=?,`subject`=?,`price`=? ,`phone`=? ,`account`=?,`bankNumber`=? ,`bankName`=? WHERE id=? ";
      db.query(
        q,
        [
          req.body.name,
          req.body.expertise,
          req.body.experience,
          req.body.subject,
          req.body.price,
          req.body.phone,
          req.body.account,
          req.body.bankNumber,
          req.body.bankName,
          req.body.id,
        ],
        (err, data) => {
          if (err) res.status(500).json(err);
          if (data.affectedRows > 0) return res.json("Updated!");
          return res.status(403).json("You can update only your post!");
        }
      );
  
  };



  export const getPostsTutor = (req, res) => {
    try {
      db.query("SELECT * FROM location AS l , tutors AS t WHERE (l.tutor = t.id)" , (err , results , fields) => {
        if(err){
          console.log(err);
          return res.status(400).send()
        }
        res.status(200).json(results)
      })
    } catch(err){
      console.log(err)
      return res.status(500).send();
    }
  };