const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/', async (req, res) => {
    try{
        const currentUser = await User.findById(req.session.user._id)
        res.render('campaigns/index.ejs', {
            user: currentUser,
            campaigns: currentUser.campaigns
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/new', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        res.render('campaigns/new.ejs', { user: currentUser })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)

    const newCampaign = {
      campaignName: req.body.campaignName,
      players: [
        {
          playerType: req.body.playerType,
          playerName: req.body.playerName,
          playerRace: req.body.playerRace,
          playerClass: req.body.playerClass,
          playerSubclass: req.body.playerSubclass,
          playerHP: req.body.playerHP,
          playerNotes: req.body.playerNotes
        }
      ],
      encounters: [
        {
          encounterName: req.body.encounterName,
          encounterDetails: req.body.encounterDetails
        }
      ],
      sessionNotes: [
        {
          sessionNumber: req.body.sessionNumber,
          sessionDetails: req.body.sessionDetails
        }
      ]
    }

    currentUser.campaigns.push(newCampaign)
    await currentUser.save()

    res.redirect(`/users/${currentUser._id}/campaigns`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/:campaignId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const campaign = currentUser.campaigns.id(req.params.campaignId)
        res.render('campaigns/show.ejs', {
            user: currentUser,
            campaign,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.delete('/:campaignId', async (req, res) => {
  try {
      const currentUser = await User.findById(req.session.user._id)
      const campaign =  currentUser.campaigns.id(req.params.campaignId)
      currentUser.campaigns.id(req.params.campaignId).deleteOne()
      await currentUser.save()
      res.redirect(`/users/${currentUser._id}/campaigns`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})



module.exports = router