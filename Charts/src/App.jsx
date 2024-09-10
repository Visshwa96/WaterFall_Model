import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WaterFall_Fetch from "./components/WaterFall_Fetch.jsx"
import WaterFall_Excel_Fetch from './components/WaterFall_Excel_Fetch.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <WaterFall_Fetch />
     <WaterFall_Excel_Fetch/>
    </>
  )
}

export default App
