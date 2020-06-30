import { Meteor } from "meteor/meteor"
import { Tracker } from 'meteor/tracker'
import { Songs as SongsUncached } from '../api/songs.js'
import { Ground } from 'meteor/ground:db'

Songs = new Ground.Collection('songs')
Songs.observeSource(SongsUncached.find())

// TODO: maybe make reactivevar?
let lastUpdatedAt
const storedTimestamp = localStorage.getItem('songsLastUpdatedAt')
if (storedTimestamp) {
  lastUpdatedAt = new Date(Number.parseInt(storedTimestamp))
} else {
  lastUpdatedAt = new Date('2020-01-01')
}
const groundDbLastUpdatedAt = lastUpdatedAt

// TODO: do some things after everything loaded

const syncUpdatedAt = () => {
  Tracker.autorun(() => {
    lastSong = Songs.findOne({}, {sort: {updatedAt: -1}, fields: {updatedAt: 1}})

    if (lastSong && (lastSong.updatedAt > lastUpdatedAt)) {
      localStorage.setItem('songsLastUpdatedAt', lastSong.updatedAt.getTime())
      lastUpdatedAt = lastSong.updatedAt
    }
  })
}

const subscription = Meteor.subscribe('songs', lastUpdatedAt, () => {
  syncUpdatedAt()
})

function checkCachedCount(cachedCount) {
  Meteor.call('songsCountBeforeOrAt', groundDbLastUpdatedAt, (err, serverCount) => {
    if (err) {
      console.log('loaded err', err)
    } else {
      if (cachedCount != serverCount) {
        console.log('broken cache detected, reloading all ...', {cachedCount, serverCount})
        localStorage.removeItem('songsLastUpdatedAt')
        lastUpdatedAt = new Date('2020-01-01')

        Meteor.subscribe('songs', lastUpdatedAt, () => {
          subscription.stop()
          syncUpdatedAt()
        })
      }
    }
  })
}

Songs.eventemitter.on('loaded', ({count}) => {
  checkCachedCount(count)
})

export default Songs