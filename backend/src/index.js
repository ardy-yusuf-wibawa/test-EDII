const express = require('express')
const { PrismaClient } = require('@prisma/client')
const cors = require('cors')
const app = express()
const port = 3000

const prisma = new PrismaClient()
app.use(
    cors({
        origin: 'http://localhost:5173',
        Credential: true
    })
)

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get(`/getDataUser/:userid`, async (req, res) => {
    try {
        const { userid } = req.params;
        if (userid === 'all') {
            const allUser = await prisma.user.findMany()
            res.json(allUser)
        } else {
            const user = await prisma.user.findUnique({
                where: {
                    userid: Number(userid),
                },
            })
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({ error: 'user not found' })
            }
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'internal server error' })
    }
})

app.post(`/setDataUser`, async (req, res) => {
    try {
        const {
            userid,
            namalengkap,
            username,
            password,
            status
        } = req.body

        const setUser = await prisma.user.create({
            data: {
                userid,
                namalengkap,
                username,
                password,
                status
            }
        })

        res.json(setUser)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'create user failed' })
    }
})

app.delete(`/delDataUser/:userid`, async (req, res) => {
    try {
        const { userid } = req.params
        const deleteUser = await prisma.user.delete({
            where: {
                userid: Number(userid),
            },
        })
        res.json(deleteUser)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'delete user failed' })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})