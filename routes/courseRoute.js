
import express from "express";
import { createCourse, getAllCourses, getCourse,enrollCourse,releaseCourse } from '../controllers/courseController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
const router = express.Router();

router.route('/').post(roleMiddleware(["teacher", "admin"]),createCourse);
router.route('/').get(getAllCourses);
router.route('/:slug').get(getCourse);
router.route('/enroll').post(enrollCourse);
router.route('/release').post(releaseCourse);
export default router;

 