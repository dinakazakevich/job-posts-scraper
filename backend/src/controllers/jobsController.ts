import { Request, Response } from 'express';
import { query } from '../database/index';

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM job_posts');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};
