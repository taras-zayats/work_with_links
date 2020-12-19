const { Router } = require('express')
const Link = require('../models/Link')
const auth = require('../middelwere/auth.middelwere')

const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {
    const { from, text } = req.body

    const exiting = await Link.findOne({ from })

    if (exiting) {
      return res.json({ link: exiting })
    }

    const link = new Link({
      text, from, owner: req.user
    })

    return res.status(201).json({ link })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'You have problem! Restart app!' })
  }
})

router.post('/delete/:id', auth, async (req, res) => {
  try {
    const links = await Link.find({ _id: req.params.id })
    if (!links) {
      return res.status(401).json({ message: 'There are link in DB' })
    }

    await Link.deleteOne({ _id: req.params.id })

    res.status(201).json({ message: 'linlk is delete' })
  } catch (e) {
    res.status(500).json({ message: 'You have problem! Restart app!' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user })
    res.json(links)
  } catch (e) {
    res.status(500).json({ message: 'You have problem! Restart app!' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (e) {
    res.status(500).json({ message: 'You have problem! Restart app!' })
  }
})

module.exports = router
