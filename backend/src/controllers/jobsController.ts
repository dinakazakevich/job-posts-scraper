import { Request, Response } from 'express';
import { query } from '../database/index';

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT id, title, company, link, archived FROM job_posts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

export const archiveJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await query (
      'UPDATE job_posts SET archived = TRUE where id = $1 RETURNING id, title, company, link, archived',[id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job post notfound'});
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error archiving job ${id}:', error);
    res.status(500).json({ error: 'Failed to archive job'});
  }
}