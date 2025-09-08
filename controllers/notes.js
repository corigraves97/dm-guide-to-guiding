const express = require('express')
const router = express.Router()

const User = require('../models/user.js')

router.get('/:campaignId/notes/new', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const campaign = currentUser.campaigns.id(req.params.campaignId)
    res.render('notes/new.ejs', {
      user: currentUser,
      campaign,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.post('/:campaignId/notes', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const campaign = currentUser.campaigns.id(req.params.campaignId)
    const newNote = {
      sessionNumber: req.body.sessionNumber,
      sessionDetails: req.body.sessionDetails
    }
    campaign.sessionNotes.push(newNote)
    await currentUser.save()
    res.redirect(`/users/${currentUser._id}/campaigns/${campaign._id}`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/:campaignId/notes/:sessionNoteId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const campaign =  currentUser.campaigns.id(req.params.campaignId)
        const sessionNote = campaign.sessionNotes.id(req.params.sessionNoteId)
        res.render('notes/show.ejs', {
            user: currentUser,
            campaign,
            sessionNote,
        })     
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }    
}) 

router.get('/:campaignId/notes/:sessionNoteId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const campaign =  currentUser.campaigns.id(req.params.campaignId)
        const sessionNote = campaign.sessionNotes.id(req.params.sessionNoteId)
        res.render('notes/edit.ejs', {
            user: currentUser,
            campaign,
            sessionNote,
        })     
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }    
})

router.put('/:campaignId/notes/:sessionNoteId', async (req, res) => {
  try {
      const currentUser = await User.findById(req.session.user._id)
      const campaign =  currentUser.campaigns.id(req.params.campaignId)
      const sessionNote = campaign.sessionNotes.id(req.params.sessionNoteId)
      sessionNote.set(req.body)
      await currentUser.save()
      res.redirect(`/users/${currentUser._id}/campaigns/${campaign._id}/notes/${req.params.sessionNoteId}`)
    } catch (error) {
      console.log(error)
      res.redirect('/')
  }
})

router.delete('/:campaignId/notes/:sessionNoteId', async (req, res) => {
  try {
      const currentUser = await User.findById(req.session.user._id)
      const campaign =  currentUser.campaigns.id(req.params.campaignId)
      const sessionNote = campaign.sessionNotes.id(req.params.sessionNoteId)
      campaign.sessionNotes.id(req.params.sessionNoteId).deleteOne()
      await currentUser.save()
      res.redirect(`/users/${currentUser._id}/campaigns/${campaign._id}`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})



module.exports = router