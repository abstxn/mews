import React, {useState, useEffect} from "react"
import axios from "axios"

export default function App() {
  const [items, setItems] = useState({})

  useEffect(() => {
    axios.get("http://localhost:3000")
      .then(res => setItems(res))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
    <h1>News Feed</h1>
    <pre>{JSON.stringify(items, null, 2)}</pre>
    </>
  )
}