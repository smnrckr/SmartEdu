import Category from '../models/Category.js';


export const createCategory = async (req, res) => {
    try {
      const category = await Category.create(req.body);
      console.log('Category:', category);
      res.status(201).json({
        status: 'success',
        category,
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };