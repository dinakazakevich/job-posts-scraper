import { Router } from 'express';
import { getAllJobs, archiveJob } from '../controllers/jobsController';

const router = Router();

router.get('/', getAllJobs);
router.patch('/:id/archive', archiveJob); 

export default router;
