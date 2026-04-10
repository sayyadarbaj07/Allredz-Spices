const { body } = require("express-validator");

exports.productValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("sizes").custom((value, { req }) => {
    if (!req.body.sizes) {
      throw new Error("At least one size is required");
    }
    try {
      // FormData se JSON string aayega, parse karenge
      const sizes = JSON.parse(req.body.sizes);
      if (!Array.isArray(sizes) || sizes.length === 0) {
        throw new Error("At least one size is required");
      }

      // Har size object check
      sizes.forEach((s) => {
        if (!s.weight) throw new Error("Weight is required for each size");
        if (!s.price || s.price <= 0)
          throw new Error("Price must be > 0 for each size");
      });

      return true;
    } catch (err) {
      throw new Error("Sizes must be a valid array");
    }
  }),

  body("image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Image is required");
    }
    return true;
  }),
];
