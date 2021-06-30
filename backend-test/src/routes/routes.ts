import { Router } from 'express'

import authMiddleware from '../middlewares/authMiddleware';

import UserController from '../controllers/UsersController'
import AuthController from '../controllers/AuthController';
import PostsController from '../controllers/PostsController';

const router = Router({mergeParams: true});

router.post('/user', UserController.store );
router.get('/user', authMiddleware, UserController.index );
router.get('/user/:id', authMiddleware, UserController.show );
router.delete('/user/me', authMiddleware, UserController.destroy );

router.post( '/login', AuthController.authenticate );

router.post( '/post', authMiddleware, PostsController.store );
router.get( '/post', authMiddleware, PostsController.index );
router.get( '/post/search', authMiddleware, PostsController.search );
router.get( '/post/:id', authMiddleware, PostsController.show );
router.put( '/post/:id', authMiddleware, PostsController.update );
router.delete( '/post/:id', authMiddleware, PostsController.destroy );



export default router;
