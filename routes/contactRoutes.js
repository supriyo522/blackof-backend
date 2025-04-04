const express = require("express");
const { body, validationResult } = require("express-validator");
const Contact = require("../models/Contact");

const router = express.Router();

// POST: Submit contact form
router.post(
  "/",
  [
    body("fullName").notEmpty().withMessage("Full Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("company").notEmpty().withMessage("Company is required"),
    body("message").notEmpty().withMessage("Message is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { fullName, email, company, message } = req.body;
      const newContact = new Contact({ fullName, email, company, message });

      await newContact.save();
      res.status(201).json({ message: "Form submitted successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
