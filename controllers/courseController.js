import Course from '../models/Course.js';
import Category from '../models/Category.js';
import User from '../models/User.js';

export const createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID
    });
    res.status(201).redirect('/courses')
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const categorySlug =req.query.categories;
    const category = await Category.findOne({slug: categorySlug});

    let filter = ({});
    if(categorySlug){
      filter={category: category._id}
    }


    const courses = await Course.find(filter).sort('-createdAt');
    const categories = await Category.find();
    res.status(200).render('courses', {
      page_name: 'courses',
      courses,
      categories,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

export const getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({slug:req.params.slug}).populate('user');
    
    res.status(200).render('course', {
      page_name: 'course',
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

export const enrollCourse = async (req, res) => {
  try {

    const user = await User.findById(req.session.userID);
    await user.courses.push({_id:req.body.course_id});
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

export default createCourse;
