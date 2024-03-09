import { useState } from 'react'

import Views from './Components/Views'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Views/>
    </>
  )
}

export default App
