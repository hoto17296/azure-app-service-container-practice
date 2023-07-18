import { Container } from '@mui/material'
import { getUserInfo } from './lib/auth'

function App() {
  const userInfo = getUserInfo()
  if (userInfo === undefined) return <p>loading...</p>

  return (
    <Container maxWidth="md">
      <h1>Hello, {userInfo.name} !</h1>
    </Container>
  )
}

export default App
