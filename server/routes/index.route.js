import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import serviceRoutes from './service.route';
import locationRoutes from './location.route';
import eventRoutes from './event.route';
import sittingRoutes from './sitting.route';
import openAppointmentsRoutes from './openappointment.route';
const router = express.Router();

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount user routes at /users
router.use('/users', userRoutes);
router.use('/services', serviceRoutes);
router.use('/locations', locationRoutes);
router.use('/events', eventRoutes);
router.use('/sittings', sittingRoutes);
router.use('/openappointments', openAppointmentsRoutes);

export default router;