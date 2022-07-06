const router = require('express').Router()
const db = require('../db')
const NotFoundError = require('../errors/NotFoundError')

router.get('/categories', async (req, res) => {
    res.json(await db('categories').orderBy('id'))
})

router.get('/category/:id', async (req, res) => {
    const { id } = req.params
    const result = await db('categories').where({ id })
    if (result.length == 0) throw new NotFoundError('Category not found')
    res.json(result)
})

module.exports = router