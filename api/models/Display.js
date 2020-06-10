const mongoose = require('mongoose')
const shortid = require('shortid')

const Schema = mongoose.Schema

const Display = new Schema({
  name: { type: String },
  layout: { type: String, default: 'spaced', enum: ['compact', 'spaced'] },
  statusBar: {
    type: [{ type: String }],
    default: () => [
      'date_' + shortid.generate(),
      'spacer_' + shortid.generate(),
      'connection_' + shortid.generate(),
      'time_' + shortid.generate()
    ]
  },
  widgets: [{ type: Schema.Types.ObjectId, ref: 'Widget' }]
})

module.exports = mongoose.model('Display', Display)
