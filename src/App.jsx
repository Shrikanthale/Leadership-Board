import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  CircularProgress,
  Paper,
  Grid,
  Divider,
  Chip,
  Avatar,
  Fade,
  Slide
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import LeaderboardTable from './components/LeaderboardTable';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// Create a custom theme with vibrant colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // Indigo
      light: '#757de8',
      dark: '#002984',
    },
    secondary: {
      main: '#ff3d00', // Deep Orange
      light: '#ff7539',
      dark: '#c30000',
    },
    background: {
      default: '#f5f7ff',
      paper: '#ffffff',
    },
    success: {
      main: '#43a047',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '0.02em',
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 40px -12px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
        },
      },
    },
  },
});

function App() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [timeFrame, setTimeFrame] = useState('all');
  const [searchUserId, setSearchUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animate, setAnimate] = useState(false);

  // Mock data for testing UI
  const mockData = [
    { id: 1, full_name: "John Smith", total_points: 320, rank: 1 },
    { id: 2, full_name: "Sarah Johnson", total_points: 280, rank: 2 },
    { id: 3, full_name: "Michael Brown", total_points: 240, rank: 3 },
    { id: 4, full_name: "Emily Davis", total_points: 200, rank: 4 },
    { id: 5, full_name: "Daniel Wilson", total_points: 180, rank: 5 },
    { id: 6, full_name: "Olivia Taylor", total_points: 140, rank: 6 },
    { id: 7, full_name: "James Miller", total_points: 120, rank: 7 },
    { id: 8, full_name: "Sophia Anderson", total_points: 100, rank: 8 },
    { id: 9, full_name: "William Thomas", total_points: 80, rank: 9 },
    { id: 10, full_name: "Ava Martinez", total_points: 60, rank: 10 }
  ];

  const fetchLeaderboardData = async () => {
    setLoading(true);
    setError(null);
    setAnimate(false);
    
    try {
      // For testing UI without backend
      setTimeout(() => {
        setLeaderboardData(mockData);
        setLoading(false);
        setAnimate(true);
      }, 800);
      
      /* Uncomment this when connecting to real backend
      let url = 'http://localhost:5000/api/leaderboard';
      const params = new URLSearchParams();
      
      if (timeFrame !== 'all') {
        params.append('timeFrame', timeFrame);
      }
      
      if (searchUserId) {
        params.append('searchUserId', searchUserId);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await axios.get(url);
      setLeaderboardData(response.data);
      setLoading(false);
      setAnimate(true);
      */
      
    } catch (err) {
      console.error('Error fetching leaderboard data:', err);
      setError('Failed to fetch leaderboard data. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchUserId(event.target.value);
  };

  const handleSearch = () => {
    fetchLeaderboardData();
  };

  const handleRecalculate = () => {
    fetchLeaderboardData();
  };

  const getTimeFrameLabel = () => {
    switch(timeFrame) {
      case 'day': return 'Today';
      case 'month': return 'This Month';
      case 'year': return 'This Year';
      default: return 'All Time';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {/* Header with animated gradient background */}
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              mb: 4, 
              borderRadius: 3,
              background: 'linear-gradient(135deg, #3f51b5 0%, #5c6bc0 50%, #3949ab 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box 
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.1,
                background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="1" fill-rule="evenodd"/%3E%3C/svg%3E")'
              }}
            />
            
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar sx={{ bgcolor: '#fff', color: theme.palette.primary.main, width: 56, height: 56 }}>
                  <EmojiEventsIcon fontSize="large" />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                  Activity Leaderboard
                </Typography>
                <Typography variant="body1">
                  Track the top performers in physical activities
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          
          {/* Filter and Search Controls */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              mb: 4, 
              borderRadius: 3, 
              background: '#fff', 
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <FilterAltIcon color="primary" />
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    Filters & Search
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ mt: 1, mb: 3 }} />
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Time Frame</InputLabel>
                  <Select
                    value={timeFrame}
                    label="Time Frame"
                    onChange={handleTimeFrameChange}
                    startAdornment={<DirectionsRunIcon sx={{ mr: 1, color: theme.palette.primary.main }} />}
                  >
                    <MenuItem value="all">All Time</MenuItem>
                    <MenuItem value="day">Today</MenuItem>
                    <MenuItem value="month">This Month</MenuItem>
                    <MenuItem value="year">This Year</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={5}>
                <TextField
                  label="Search by User ID"
                  variant="outlined"
                  fullWidth
                  value={searchUserId}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: theme.palette.primary.main }} />,
                  }}
                />
              </Grid>
              
              <Grid item xs={6} md={1.5}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handleSearch}
                  sx={{ height: '56px' }}
                  startIcon={<SearchIcon />}
                >
                  Search
                </Button>
              </Grid>
              
              <Grid item xs={6} md={1.5}>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  size="large"
                  onClick={handleRecalculate}
                  sx={{ height: '56px' }}
                  startIcon={<RefreshIcon />}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Paper>
          
          {/* Leaderboard Results */}
          <Paper 
            elevation={3} 
            sx={{ 
              borderRadius: 3,
              overflow: 'hidden'
            }}
          >
            <Box sx={{ 
              p: 2, 
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Box display="flex" alignItems="center">
                <FitnessCenterIcon sx={{ mr: 1 }} />
                <Typography variant="h6">
                  {getTimeFrameLabel()} Rankings
                </Typography>
              </Box>
              
              <Chip 
                label={`${leaderboardData.length} Users`} 
                color="secondary" 
                size="small"
                sx={{ fontWeight: 'bold' }}
              />
            </Box>
            
            {error && (
              <Box sx={{ p: 2, bgcolor: '#ffebee' }}>
                <Typography color="error">
                  {error}
                </Typography>
              </Box>
            )}
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
                <CircularProgress size={60} thickness={4} />
              </Box>
            ) : (
              <Fade in={animate} timeout={500}>
                <Box>
                  <LeaderboardTable data={leaderboardData} />
                </Box>
              </Fade>
            )}
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;