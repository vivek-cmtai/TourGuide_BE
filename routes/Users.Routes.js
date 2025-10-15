import express from "express";
import {
  getAllUsers,
  getUserById,
  getUsersByRole,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/users
 * @desc    Get all users (supports pagination & search)
 * @access  Protected (admin, guide, manager)
 */
router.get("/", protect, authorize("admin", "guide", "manager") , getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Protected (admin, guide, manager)
 */
router.get("/:id", protect, authorize("admin", "guide", "manager") , getUserById);

/**
 * @route   GET /api/users/role/:role
 * @desc    Get users by role
 * @access  Protected (admin, guide, manager)
 */
router.get("/role/:role",protect, authorize("admin", "guide", "manager") , getUsersByRole);



/**
 * @route   PUT /api/users/:id
 * @desc    Update user
 * @access  Protected (admin, guide, manager)
 */
router.put("/:id",protect, authorize("admin", "guide", "manager") , updateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user
 * @access  Protected (admin, guide, manager)
 */
router.delete("/:id",protect, authorize("admin", "guide", "manager") , deleteUser);

export default router;
