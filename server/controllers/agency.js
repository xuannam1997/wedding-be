import mongoose from "mongoose";
import Agency from "../models/agency.js";

// create new cause
export function createAgency(req, res) {
  const agency = new Agency({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
  });

  return agency
    .save()
    .then((newAgency) => {
      return res.status(201).json({
        success: true,
        message: "New agency created successfully",
        agency: newAgency,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
}

// Get all course
export function getAllAgency(req, res) {
  Agency.find()
    .select("_id name phone address")
    .then((allAgency) => {
      return res.status(200).json({
        success: true,
        message: "A list of all agency",
        agency: allAgency,
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

// get single course
export function getSingleAgency(req, res) {
  const id = req.params.agencyId;
  Agency.findById(id)
    .then((singleAgency) => {
      res.status(200).json({
        success: true,
        message: `More on ${singleAgency.title}`,
        agency: singleAgency,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This agency does not exist",
        error: err.message,
      });
    });
}

// delete a course
export function deleteAgency(req, res) {
  const id = req.params.agencyId;
  Agency.findByIdAndRemove(id)
    .exec()
    .then(() =>
      res.status(204).json({
        success: true,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
}
