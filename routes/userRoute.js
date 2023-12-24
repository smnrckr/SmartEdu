
import express from "express";
import {createUser,getDashboardPage,loginUser, logoutUser} from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { body } from 'express-validator';
import User from '../models/User.js';

const router = express.Router();


router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Please Enter Your Name'),


        body('email').isEmail().withMessage('Please Enter Valid Email')
        .custom((userEmail)=> {
            return User.findOne({email:userEmail}).then(user => {
                if (user) {
                    return Promise.reject('Email is already exists!')
                }
            })
        }),

        body('password').not().isEmpty().withMessage('Please Enter A Password'),
    ],
    createUser); // http://localhost:3000/users/signuprouter.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/dashboard').get(authMiddleware, getDashboardPage);
router.route('/login').post(loginUser);
export default router;

