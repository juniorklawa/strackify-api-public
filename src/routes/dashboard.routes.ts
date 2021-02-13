import { Router } from 'express';
import dashboardController from '../controllers/DashboardController';

const dashboardRouter = Router();

dashboardRouter.get('/', dashboardController.getDashboard);

export default dashboardRouter;
