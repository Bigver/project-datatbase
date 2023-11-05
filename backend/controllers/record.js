import { db } from "../connect.js";
import jwt from "jsonwebtoken";



export const getRecord = (req, res) => {
  const id = req.params.id
  try {
    db.query("SELECT  r.payment , r.learn , l.address , t.name , r.date , r.imgPayment , t.phone  FROM record AS r , users AS u , location AS l , tutors AS t WHERE (r.student_id = u.id) AND (r.location_id = l._id) AND (l.tutor = t.id) AND u.id = ? ", id , (err , results , fields) => {
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
}
;


export const updateRecord = (req, res) => {
  const q =
      "UPDATE record SET `payment`=?  WHERE _id=? ";
    db.query(
      q,
      [
        req.body.payment,
        req.body._id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );

};


export const getRecordTutor = (req, res) => {
  const id = req.params.id
  try {
    db.query("SELECT   r._id , r.payment , r.learn ,  u.name , r.date , r.imgPayment , u.phone  FROM record AS r , users AS u , location AS l , tutors AS t WHERE (r.student_id = u.id) AND (r.location_id = l._id) AND (l.tutor = t.id) AND t.id = ? ", id , (err , results , fields) => {
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
}
;

export const apply = (req, res) => {
      const q =
        "INSERT INTO record(`payment`, `learn`, `student_id`, `location_id` ,`date` ,`imgPayment`) VALUES (?)";
      const values = [
        req.body.payment,
        req.body.learn,
        req.body.student_id,
        req.body.location_id,
        req.body.date,
        req.body.imgPayment
      ];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Apply to study.");
      });
  };
  