import express from "express";
import {
  getAllUsers,
  getUserById,
  getUsersByRole,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

/**
 * @route   GET /api/users
 * @desc    Get all users (supports pagination & search)
 * @access  Admin
 */
router.get("/", getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Admin
 */
router.get("/:id", getUserById);

/**
 * @route   GET /api/users/role/:role
 * @desc    Get users by role
 * @access  Admin
 */
router.get("/role/:role", getUsersByRole);

/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @access  Admin
 */
router.post("/", createUser);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user
 * @access  Admin
 */
router.put("/:id", updateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user
 * @access  Admin
 */
router.delete("/:id", deleteUser);

export default router;
