import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import InstructionsForm from '../components/InstructionsForm'
import Navbar from '../components/Navbar'
import Footer from '.././components/Footer'

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

export default function About() {
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
          <InstructionsForm />
          <Typography variant="h2" component="h1" gutterBottom>
            About us
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {'Something wrong with your patch, young jedi'}
          </Typography>
          <Typography variant="body1">restart app or choose another option on Navbar</Typography>
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
