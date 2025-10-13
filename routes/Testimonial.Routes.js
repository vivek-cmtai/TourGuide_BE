import express from "express";
import {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonials.controller.js";

const router = express.Router();

/**
 * @route   GET /api/testimonials
 * @desc    Get all testimonials (supports pagination & search)
 * @access  Public
 */
router.get("/", getAllTestimonials);

/**
 * @route   GET /api/testimonials/:id
 * @desc    Get testimonial by ID
 * @access  Public
 */
router.get("/:id", getTestimonialById);

/**
 * @route   POST /api/testimonials
 * @desc    Create a new testimonial
 * @access  Admin
 */
router.post("/", createTestimonial);

/**
 * @route   PUT /api/testimonials/:id
 * @desc    Update testimonial
 * @access  Admin
 */
router.put("/:id", updateTestimonial);

/**
 * @route   DELETE /api/testimonials/:id
 * @desc    Delete testimonial
 * @access  Admin
 */
router.delete("/:id", deleteTestimonial);

export default router;
