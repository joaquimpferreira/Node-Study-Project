const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())





const users = []

const checkIdUsers = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User Not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { age, name } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkIdUsers, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUsers = { id, name, age }

    users[index] = updateUsers

    return response.json(updateUsers)
})

app.delete('/users/:id', checkIdUsers, (request, response) => {

    const index = request.userIndex
    const id = request.userId

    users.splice(index, 1)


    return response.status(204).json()
})






app.listen(port, () => {
    console.log(`🚀 Server start on port ${port}`)
})