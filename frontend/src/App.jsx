import React, {useState, useEffect} from "react"
import axios from "axios"
import Article from "../components/Article"

export default function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000")
      .then(res => setItems(res.data.items))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <h1>News Feed</h1>
      {items.map((item, index) => (
        <Article key={index} item={item} />
      ))}
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </>
  )
}