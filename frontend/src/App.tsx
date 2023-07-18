import { getUserInfo } from './lib/auth'

function App() {
  const userInfo = getUserInfo()
  if (userInfo === undefined) return <p>loading...</p>

  return (
    <>
      <h1>Hello, {userInfo.name} !</h1>
    </>
  )
}

export default App
