import { useState, useEffect } from 'react'
import { getUserInfo } from './lib/auth'

function App() {
  const userInfo = getUserInfo()

  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    const evtSource = new EventSource('/api/chat')

    evtSource.addEventListener('new_message', (event) => {
      const data = JSON.parse(event.data)
      if (!data.content) return
      setMessage((message) => message + data.content)
    })

    evtSource.addEventListener('end_event', () => evtSource.close())

    return () => evtSource.close()
  }, [])

  if (userInfo === undefined) return <p>loading...</p>

  return (
    <>
      <h1>Hello, {userInfo.name} !</h1>
      <p>{message}</p>
    </>
  )
}

export default App
