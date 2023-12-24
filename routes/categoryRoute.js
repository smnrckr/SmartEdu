
import express from "express";
import { createCategory, deleteCategory} from '../controllers/categoryController.js';

const router = express.Router();

router.route('/').post(createCategory);
router.route('/:id').delete(deleteCategory);

export default router;

