// src/App.js
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
  Fade
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

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: '#757de8',
      dark: '#002984',
    },
    secondary: {
      main: '#ff3d00',
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
  }
});

function App() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [timeFrame, setTimeFrame] = useState('all');
  const [searchUserId, setSearchUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animate, setAnimate] = useState(false);

  console.log("leaderboardData",leaderboardData)
  const fetchLeaderboardData = async () => {
    setLoading(true);
    setError(null);
    setAnimate(false);

    try {
      let url = 'http://192.168.1.9:5000/api/activity';
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

    } catch (err) {
      console.error('Error fetching leaderboard data:', err);
      setError('Failed to fetch leaderboard data. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const getTimeFrameLabel = () => {
    switch (timeFrame) {
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
          <Paper sx={{ p: 4, mb: 4, borderRadius: 3, background: 'linear-gradient(135deg, #3f51b5, #3949ab)', color: 'white' }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar sx={{ bgcolor: '#fff', color: theme.palette.primary.main }}>
                  <EmojiEventsIcon />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h4">Activity Leaderboard</Typography>
                <Typography variant="body1">Track the top performers in physical activities</Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item><FilterAltIcon color="primary" /></Grid>
                <Grid item><Typography variant="h6">Filters & Search</Typography></Grid>
              </Grid>
              <Divider sx={{ mt: 1, mb: 3 }} />
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Time Frame</InputLabel>
                  <Select value={timeFrame} label="Time Frame" onChange={(e) => setTimeFrame(e.target.value)}>
                    <MenuItem value="all">All Time</MenuItem>
                    <MenuItem value="day">Today</MenuItem>
                    <MenuItem value="month">This Month</MenuItem>
                    <MenuItem value="year">This Year</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField label="Search by User ID" variant="outlined" fullWidth value={searchUserId} onChange={(e) => setSearchUserId(e.target.value)} />
              </Grid>
              <Grid item xs={6} md={1.5}>
                <Button fullWidth variant="contained" onClick={fetchLeaderboardData} startIcon={<SearchIcon />}>Search</Button>
              </Grid>
              <Grid item xs={6} md={1.5}>
                <Button fullWidth variant="outlined" onClick={fetchLeaderboardData} startIcon={<RefreshIcon />}>Update</Button>
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <Box sx={{ p: 2, backgroundColor: theme.palette.primary.main, color: 'white', display: 'flex', justifyContent: 'space-between' }}>
              <Box display="flex" alignItems="center">
                <FitnessCenterIcon sx={{ mr: 1 }} />
                <Typography variant="h6">{getTimeFrameLabel()} Rankings</Typography>
              </Box>
              <Chip label={`${leaderboardData.length} Users`} color="secondary" />
            </Box>
            {error && <Box sx={{ p: 2, bgcolor: '#ffebee' }}><Typography color="error">{error}</Typography></Box>}
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
