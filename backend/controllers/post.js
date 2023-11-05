import { db } from "../connect.js";
import jwt from "jsonwebtoken";



export const getPosts = (req, res) => {
    try {
      db.query("SELECT * FROM location" , (err , results , fields) => {
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
}
;


export const getPost = (req, res) => {
  const _id = req.params.id
  try {
    db.query("SELECT * FROM location AS l , tutors AS t WHERE (l.tutor = t.id) AND _id = ?" , _id ,(err , results , fields) => {
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




export const addPost = (req, res) => {
    const q =
      "INSERT INTO location(`address`, `tutor`, `name_location`, `img`, `vdo`, `details` , `longitude` , `latitude`) VALUES (?)";
    const values = [
      req.body.address,
      req.body.tutor,
      req.body.name_location,
      req.body.img,
      req.body.vdo,
      req.body.details,
      req.body.longitude,
      req.body.latitude,

    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
};


export const updatePost = (req, res) => {
  const q =
        "UPDATE location SET `address`=?,`tutor`=?,`name_location`=?,`img`=?,`vdo`=? ,`details`=? ,`longitude`=?,`latitude`=? WHERE _id=? ";

  db.query(
    q,
    [
      req.body.address,
      req.body.tutor,
      req.body.name_location,
      req.body.img,
      req.body.vdo,
      req.body.details,
      req.body.longitude,
      req.body.latitude,
      req.body._id
    ],
    (err, data) => {
      if (err) res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Updated!");
      return res.status(403).json("You can update only your post!");
    }
  );
};



export const deletePost = (req, res) => {
    const _id = req.params.id
    const q =
      "DELETE FROM location WHERE `_id` = ?";

    db.query(q, [_id], (err, data) => {
      if (err) return res.status(500).json(err);
      if(data.affectedRows>0) return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post")
    });
};
