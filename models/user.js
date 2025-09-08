const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    playerType: {
        type: String, 
        enum: ['PC', 'NPC'],
        required: true,
    },
    playerName: {
        type: String,
        required: true,
    },
    playerRace: {
        type: String,   
    },
    playerClass: {
        type: String, 
    },
    playerSubclass: {
        type: String,
    },
    playerHP: {
        type: String,
    },
    playerNotes: {
        type: String,
    },
})

const encounterSchema = new mongoose.Schema({
    encounterName: {
        type: String, 
        required: true,
    },
    encounterDetails: {
        type: String,
    },
})

const noteSchema = new mongoose.Schema({
    sessionNumber: {
        type: String, 
        required: true,
    },
    sessionDetails: {
        type: String,
    },
})

const campaignSchema = new mongoose.Schema({
    campaignName: {
        type: String, 
        required: true,
    },
    players: [playerSchema],
    encounters: [encounterSchema],
    sessionNotes: [noteSchema],
})


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    campaigns: [campaignSchema],
    
})
const Notes = mongoose.model('Notes', noteSchema)
const Encounters = mongoose.model('Encounters', encounterSchema)
const Players = mongoose.model('Players', playerSchema)
const Campaign = mongoose.model('Campaign', campaignSchema)
const User = mongoose.model('User', userSchema)

module.exports = User