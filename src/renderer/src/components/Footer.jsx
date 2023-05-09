import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

function Footer() {
  return (
    <Typography variant="body1" color="text.secondary" align="center">
      {'Copyright not yet reserved © '}
      <Link color="inherit" href="https://github.com/SmaqwaTeam">
        Github
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
export default Footer
