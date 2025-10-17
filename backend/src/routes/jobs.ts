import { Router } from 'express';
import { getAllJobs } from '../controllers/jobsController';

const router = Router();

router.get('/', getAllJobs);

export default router;
