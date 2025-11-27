import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

// Import Material-UI components
import {
  Container,
  Typography,
  List,
  ListItem,
  CircularProgress,
  Box,
  AppBar,
  Toolbar,
} from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';


interface JobPost {
  id: number;
  title: string;
  company: string;
  link: string;
}

function App() {
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: JobPost[] = await response.json();
        setJobPosts(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobPosts();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <BusinessCenterIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Job Scraper
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ ml: 2 }}>
              Loading job posts...
            </Typography>
          </Box>
        )}
        {error && (
          <Typography variant="body1" color="error" sx={{ mt: 2 }}>
            Error: {error}
          </Typography>
        )}
        {!loading && !error && (
          <Box>
            <Typography variant="h4" component="h2" gutterBottom>
              Available Job Posts
            </Typography>
            <List>
              {jobPosts.map((job) => {
                console.log('Rendering job:', job); // Added console log here
                return (
                  <ListItem key={job.id} disablePadding>
                    <a href={job.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Typography variant="body1" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                        {job.title}
                      </Typography>
                    </a>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;
