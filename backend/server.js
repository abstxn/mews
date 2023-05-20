import express from "express"

const app = express()
const port = 5000

// Parse the request into a JSON object before route handling
// Also known as "global level middleware", as it applies to all routes
app.use(express.json())

// Also known as "route level middleware", as it applies only to /api/v1/mews routes
app.use("/api/v1/mews", mews)
// Any other route accessed will result in a 404
app.use("*", (req, res) => {
    res.status(404).json({error: "not found"})
})

// app.listen(port, () => {
//     console.log(`Server is listening for requests on port ${port}`)
// })

export default app