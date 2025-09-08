const express = require('express')
const router = express.Router()

const User = require('../models/user.js')

router.get('/:campaignId/players/new', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const campaign = currentUser.campaigns.id(req.params.campaignId)
    res.render('players/new.ejs', {
      user: currentUser,
      campaign,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.post('/:campaignId/players', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const campaign = currentUser.campaigns.id(req.params.campaignId)
    const newPlayer = {
      playerType: req.body.playerType,
      playerName: req.body.playerName,
      playerRace: req.body.playerRace,
      playerClass: req.body.playerClass,
      playerSubclass: req.body.playerSubclass,
      playerHP: req.body.playerHP,
      playerNotes: req.body.playerNotes,
    }
    campaign.players.push(newPlayer)
    await currentUser.save()
    res.redirect(`/users/${currentUser._id}/campaigns/${campaign._id}`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/:campaignId/players/:playerId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const campaign =  currentUser.campaigns.id(req.params.campaignId)
        const player = campaign.players.id(req.params.playerId)
        res.render('players/show.ejs', {
            user: currentUser,
            campaign,
            player,
        })     
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }    
}) 

router.get('/:campaignId/players/:playerId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const campaign =  currentUser.campaigns.id(req.params.campaignId)
        const player = campaign.players.id(req.params.playerId)
        res.render('players/edit.ejs', {
            user: currentUser,
            campaign,
            player,
        })     
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }    
})

router.put('/:campaignId/players/:playerId', async (req, res) => {
  try {
      const currentUser = await User.findById(req.session.user._id)
      const campaign =  currentUser.campaigns.id(req.params.campaignId)
      const player = campaign.players.id(req.params.playerId)
      player.set(req.body)
      await currentUser.save()
      res.redirect(`/users/${currentUser._id}/campaigns/${campaign._id}/players/${req.params.playerId}`)
    } catch (error) {
      console.log(error)
      res.redirect('/')
  }
})

router.delete('/:campaignId/players/:playerId', async (req, res) => {
  try {
      const currentUser = await User.findById(req.session.user._id)
      const campaign =  currentUser.campaigns.id(req.params.campaignId)
      const player = campaign.players.id(req.params.playerId)
      campaign.players.id(req.params.playerId).deleteOne()
      await currentUser.save()
      res.redirect(`/users/${currentUser._id}/campaigns/${campaign._id}`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})


module.exports = router