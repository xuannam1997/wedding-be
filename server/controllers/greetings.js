import mongoose from "mongoose";
import Greetings from "../models/greetings.js";

export function createGreetings(req, res) {
  const greetings = new Greetings({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    message: req.body.message,
  });

  return greetings
    .save()
    .then((newGreetings) => {
      return res.status(201).json({
        success: true,
        message: "New greetings created successfully",
        greetings: newGreetings,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
}

export function getAllGreetings(req, res) {
  Greetings.find()
    .select("_id name message")
    .then((allGreetings) => {
      return res.status(200).json({
        success: true,
        message: "A list of all greetings",
        greetings: allGreetings,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}
