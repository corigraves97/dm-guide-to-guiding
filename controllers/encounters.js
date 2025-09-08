const express = require('express')
const router = express.Router()

const User = require('../models/user.js')

router.get('/:campaignId/encounters/new', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const campaign = currentUser.campaigns.id(req.params.campaignId)
    res.render('encounters/new.ejs', {
      user: currentUser,
      campaign,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.post('/:campaignId/encounters', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const campaign = currentUser.campaigns.id(req.params.campaignId)
    const newEncounter = {
      encounterName: req.body.encounterName,
      encounterDetails: req.body.encounterDetails
    }
    campaign.encounters.push(newEncounter)
    await currentUser.save()
    res.redirect(`/users/${currentUser._id}/campaigns/${campaign._id}`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/:campaignId/encounters/:encounterId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const campaign =  currentUser.campaigns.id(req.params.campaignId)
        const encounter = campaign.encounters.id(req.params.encounterId)
        res.render('encounters/show.ejs', {
            user: currentUser,
            campaign,
            encounter,
        })     
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }    
}) 

router.get('/:campaignId/encounters/:encounterId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const campaign =  currentUser.campaigns.id(req.params.campaignId)
        const encounter = campaign.encounters.id(req.params.encounterId)
        res.render('encounters/edit.ejs', {
            user: currentUser,
            campaign,
            encounter,
        })     
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }    
})

router.put('/:campaignId/encounters/:encounterId', async (req, res) => {
  try {
      const currentUser = await User.findById(req.session.user._id)
      const campaign =  currentUser.campaigns.id(req.params.campaignId)
      const encounter = campaign.encounters.id(req.params.encounterId)
      encounter.set(req.body)
      await currentUser.save()
      res.redirect(`/users/${currentUser._id}/campaigns/${campaign._id}/encounters/${req.params.encounterId}`)
    } catch (error) {
      console.log(error)
      res.redirect('/')
  }
})

router.delete('/:campaignId/encounters/:encounterId', async (req, res) => {
  try {
      const currentUser = await User.findById(req.session.user._id)
      const campaign =  currentUser.campaigns.id(req.params.campaignId)
      const encounter = campaign.encounters.id(req.params.encounterId)
      campaign.encounters.id(req.params.encounterId).deleteOne()
      await currentUser.save()
      res.redirect(`/users/${currentUser._id}/campaigns/${campaign._id}`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})






module.exports = router