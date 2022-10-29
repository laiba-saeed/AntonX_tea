const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Member = require("../models/member");

// Create a new Member
router.post('/signup', (req, res, next) => {
    Member.find({ email: req.body.email })
    .exec()
    .then(member => {
        if( member.length >= 1 ) {
            return res.status(409).json({
                message: "Email already exists"
            });
        } else {
            const member = new Member({
                fullname: req.body.fullname,
                email: req.body.email,
                DateOfBirth: req.body.DateOfBirth,
                atnNumber: req.body.atnNumber
            }); 
            member.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: "Member Created"
                });
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
        }
    });
});

// List all the Members
router.get("/", (req, res, next) => {
    Member.find()
    .select("fullname email DateOfBirth atnNumber")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            members: docs.map(doc => {
                return {
                    fullname: doc.fullname,
                    email: doc.email,
                    DateOfBirth: doc.DateOfBirth,
                    atnNumber: doc.atnNumber
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
      res.status(500).json({
        error: err
      });
    })
})

// Get data of a specified member using atnNumber
router.get("/", (req, res, next) => {
    const atnNumber = req.body.atnNumber;
    Member.findById(atnNumber)
      .select('fullname email DateOfBirth atnNumber')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              product: doc
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided atnNumber" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });
  

router.patch("/:atnNumber", (req, res, next) => {
    const atnNumber = req.params.atnNumber;
    const updateOps = {};
    const body = req.body;
    for (const ops of body) {
        updateOps[ops.propName] = ops.value;
    }    
    Member.Update({ _atnNumber: atnNumber }, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Information Updated'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});

router.delete("/:atnNumber", (req, res, next) => {
    const atnNumber = req.params.atnNumber;
    Member.remove({ _atnNumber: atnNumber })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Member deleted'
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  

module.exports = router