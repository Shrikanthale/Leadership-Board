import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Avatar,
  Chip,
  Zoom,
  LinearProgress,
  useTheme
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import StarsIcon from '@mui/icons-material/Stars';
import PersonIcon from '@mui/icons-material/Person';
import { useMemo } from "react";
const LeaderboardTable = ({ data }) => {
  const theme = useTheme();
  
  // Define medal colors and icons for top 3 ranks
  const getRankDisplay = (rank) => {
    switch (rank) {
      case 1:
        return {
          color: '#FFD700', // Gold
          icon: <EmojiEventsIcon sx={{ color: '#FFD700' }} />,
          bgColor: 'rgba(255, 215, 0, 0.1)',
          borderColor: 'rgba(255, 215, 0, 0.5)'
        };
      case 2:
        return {
          color: '#C0C0C0', // Silver
          icon: <WorkspacePremiumIcon sx={{ color: '#C0C0C0' }} />,
          bgColor: 'rgba(192, 192, 192, 0.1)',
          borderColor: 'rgba(192, 192, 192, 0.5)'
        };
      case 3:
        return {
          color: '#CD7F32', // Bronze
          icon: <StarsIcon sx={{ color: '#CD7F32' }} />,
          bgColor: 'rgba(205, 127, 50, 0.1)',
          borderColor: 'rgba(205, 127, 50, 0.5)'
        };
      default:
        return {
          color: theme.palette.text.primary,
          icon: null,
          bgColor: 'transparent',
          borderColor: 'transparent'
        };
    }
  };
  
  // Find highest points for progress bar calculation
  const maxPoints = data.length > 0 ? Math.max(...data.map(user => user.total_points)) : 100;

  // Get random color for avatar based on user ID
  const getAvatarColor = (id) => {
    const colors = [
      '#3f51b5', '#f44336', '#009688', '#ff9800', '#9c27b0',
      '#2196f3', '#ff5722', '#4caf50', '#673ab7', '#795548'
    ];
    return colors[id % colors.length];
  };

  // Get initials from user's full name
  const getInitials = (name) => {
    return name
      ?.split(' ')
      ?.map(part => part[0])
      ?.join('')
      ?.toUpperCase()
      ?.slice(0, 2);
  };
//   const processedData = useMemo(() => {
//     const grouped = {};
  
//     data.forEach((item) => {
//       const name = item.userName;
//       if (!grouped[name]) {
//         grouped[name] = {
//           ...item,
//           points: 0,
//           entries: 0,
//         };
//       }
//       grouped[name].points += item.points;
//       grouped[name].entries += 1;
//     });
  
//     const groupedArray = Object.values(grouped);
  
//     // Sort descending by points, then by entries if tie
//     groupedArray.sort((a, b) => {
//       if (b.points !== a.points) return b.points - a.points;
//       return b.entries - a.entries;
//     });
  
//     // Add rank
//     return groupedArray.map((item, index) => ({
//       ...item,
//       rank: index + 1,
//     }));
//   }, [data]);
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
            <TableCell align="center" sx={{ fontWeight: 'bold', width: '10%' }}>Rank</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '40%' }}>User</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', width: '35%' }}>Total Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                <Typography variant="body1">No data available</Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => {
              const rankDisplay = getRankDisplay(row.rank);
              const isTopThree = row.rank <= 3;
              console.log("row",row)
              return (
                <Zoom 
                  in={true} 
                  style={{ transitionDelay: `${index * 100}ms` }}
                  key={row.id}
                >
                  <TableRow 
                    sx={{ 
                      '&:hover': { backgroundColor: rankDisplay.bgColor || theme.palette.action.hover },
                      backgroundColor: isTopThree ? rankDisplay.bgColor : (index % 2 === 0 ? theme.palette.background.default : theme.palette.background.paper),
                      borderLeft: isTopThree ? `4px solid ${rankDisplay.borderColor}` : 'none',
                    }}
                  >
                    <TableCell align="center">
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                      }}>
                        {isTopThree ? (
                          <Box 
                            sx={{ 
                              borderRadius: '50%',
                              backgroundColor: rankDisplay.color,
                              color: '#fff',
                              width: 36,
                              height: 36,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              fontSize: '1.1rem',
                              boxShadow: `0 4px 8px -2px ${rankDisplay.color}80`
                            }}
                          >
                            {row.rank}
                          </Box>
                        ) : (
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontWeight: 'medium',
                              color: theme.palette.text.secondary
                            }}
                          >
                            {row.rank}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Chip 
                        label={`#${row._id}`} 
                        size="small" 
                        variant={isTopThree ? "filled" : "outlined"}
                        color={isTopThree ? "primary" : "default"}
                        sx={{ fontWeight: isTopThree ? 'bold' : 'normal' }}
                      />
                    </TableCell>
                    
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: getAvatarColor(row.id),
                            mr: 2,
                            boxShadow: isTopThree ? `0 0 0 2px ${rankDisplay.color}` : 'none'
                          }}
                        >
                          {getInitials(row.userName)}
                        </Avatar>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: isTopThree ? 'bold' : 'normal',
                            color: isTopThree ? rankDisplay.color : theme.palette.text.primary
                          }}
                        >
                          {row.userName}
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* <Box sx={{ width: '70%', mr: 2 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={(row.total_points / maxPoints) * 100}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: theme.palette.grey[200],
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 4,
                                backgroundColor: isTopThree ? rankDisplay.color : theme.palette.primary.main,
                              }
                            }}
                          />
                        </Box> */}
                        <Box sx={{ 
                          minWidth: 70, 
                          textAlign: 'right',
                          color: isTopThree ? rankDisplay.color : theme.palette.text.primary,
                          fontWeight: 'bold',
                          fontSize: '1.1rem'
                        }}>
                          {row.points}
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                </Zoom>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaderboardTable;