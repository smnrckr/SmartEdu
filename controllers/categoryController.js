import Category from '../models/Category.js';


export const createCategory = async (req, res) => {
    try {
      const category = await Category.create(req.body);
      console.log('Category:', category);
      res.status(201).redirect('/users/dashboard');
    } catch (error) {
      console.error('Error:', error);
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };

  export const deleteCategory = async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);  
      res.status(200).redirect('/users/dashboard');
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };