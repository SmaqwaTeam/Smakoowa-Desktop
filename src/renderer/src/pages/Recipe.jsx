import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import RecipeDetails from '../components/Recipe/RecipeDetails'
import Navbar from '../components/Navbar'
import Footer from '.././components/Footer'

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

export default function Recipe() {
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
          <RecipeDetails />
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
