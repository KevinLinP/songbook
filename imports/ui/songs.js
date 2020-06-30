import { Meteor } from "meteor/meteor"
import { Tracker } from 'meteor/tracker'
import { Songs as SongsUncached } from '../api/songs.js'
import { Ground } from 'meteor/ground:db'

Songs = new Ground.Collection('songs')
Songs.observeSource(SongsUncached.find())
let lastUpdatedAt = localStorage.getItem('songsLastUpdatedAt') || new Date('2020-01-01')

Meteor.subscribe('songs', lastUpdatedAt, () => {
  Tracker.autorun(() => {
    lastSong = Songs.findOne({}, {sort: {updatedAt: -1}, fields: {updatedAt: 1}})

    if (lastSong && (lastSong.updatedAt > lastUpdatedAt)) {
      localStorage.setItem('songsLastUpdatedAt', lastSong.updatedAt)
      lastUpdatedAt = lastSong.updatedAt
    }
  })
})

export default Songs