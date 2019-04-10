import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import serviceRoutes from './service.route';
import locationRoutes from './location.route';
import eventRoutes from './event.route';
import sittingRoutes from './sitting.route';
import openAppointmentsRoutes from './openappointment.route';
import fileRoutes from './file.route';
import adminRoutes from './admin.route';
import emailRoutes from './email.route';
import appointmentRoutes from './appointment.route';

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
router.use('/files', fileRoutes);
router.use('/admins', adminRoutes);
router.use('/emails', emailRoutes);
router.use('/appointments', appointmentRoutes);

export default router;