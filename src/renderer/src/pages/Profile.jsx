import { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import UserRecipes from '../components/Recipe/UserRecipes'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import profileImage from '../assets/profile.png'
import Statistics from '../components/Recipe/Statistics'

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

export default function Profile() {
  const [user, setUser] = useState(null)
  const [roles, setRoles] = useState(null)
  const [currentTab, setCurrentTab] = useState(0)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const { content } = JSON.parse(userData)
      setUser(content)

      const userRoles = content?.user?.userRoles || []
      setRoles(userRoles.includes('Admin') ? 'admin' : 'user')
    }
  }, [])

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Navbar />
        <CssBaseline />
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <img src={profileImage} alt="Profile" style={{ width: '200px', borderRadius: '50%' }} />
          <Typography variant="h2" component="h1" gutterBottom>
            Profile
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Welcome, {user?.user?.username || 'Unknown'}!
          </Typography>
          <Typography variant="body1">Your email: {user?.user?.email || 'Unknown'}</Typography>
        </Container>
        <Container sx={{ py: 4 }} maxWidth="md">
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="Your Recipes" />
            {roles === 'admin' && <Tab label="Statistics" />}
          </Tabs>
          {currentTab === 0 && (
            <Container sx={{ py: 4 }}>
              <Typography variant="h2" component="h1" gutterBottom>
                Your Recipes
              </Typography>
              <Grid container spacing={4}>
                <Grid item xl={12} sm={6} md={4}>
                  <UserRecipes />
                </Grid>
              </Grid>
            </Container>
          )}
          {currentTab === 1 && roles === 'admin' && (
            <Container sx={{ py: 4 }}>
              <Typography variant="h2" component="h1" gutterBottom>
                Statistics
              </Typography>
              <Statistics />
            </Container>
          )}
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto'
          }}
        >
          <Container maxWidth="sm">
            <Footer />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
