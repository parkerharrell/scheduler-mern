import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import serviceRoutes from './service.route';
import locationRoutes from './location.route';
import eventRoutes from './event.route';

const router = express.Router();

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount user routes at /users
router.use('/users', userRoutes);
router.use('/services', serviceRoutes);
router.use('/locations', locationRoutes);
router.use('/events', eventRoutes);

export default router;