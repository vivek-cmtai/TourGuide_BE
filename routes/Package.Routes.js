import express from "express";
import { getAllPackages, getPackageById, createPackage, updatePackage, deletePackage} from "../controllers/package.controller.js";

const router = express.Router();

/**
 * @route   GET /api/packages
 * @desc    Get all packages (supports pagination & search)
 * @access  Public
 */
router.get("/", getAllPackages);

/**
 * @route   GET /api/packages/:id
 * @desc    Get a single package by ID
 * @access  Public
 */
router.get("/:id", getPackageById);

/**
 * @route   POST /api/packages
 * @desc    Create a new package
 * @access  Admin
 */
router.post("/", createPackage);

/**
 * @route   PUT /api/packages/:id
 * @desc    Update an existing package
 * @access  Admin
 */
router.put("/:id", updatePackage);

/**
 * @route   DELETE /api/packages/:id
 * @desc    Delete a package
 * @access  Admin
 */
router.delete("/:id", deletePackage);

export default router;
