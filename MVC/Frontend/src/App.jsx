import axios from 'axios'
import React, { useEffect } from 'react'

const App = () => {

  async function showApi() {
    const res = await axios.get('http://localhost:8000/api/blogs')
    console.log(res.data)
  }

  useEffect(() => {
    showApi()
  })
  return (
    <div>App</div>
  )
}

export default App