
import express from "express";
import { createCourse, getAllCourses, getCourse } from '../controllers/courseController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
const router = express.Router();

router.route('/').post(roleMiddleware(["teacher", "admin"]),createCourse);
router.route('/').get(getAllCourses);
router.route('/:slug').get(getCourse);

export default router;

 