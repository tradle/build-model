const clone = require('clone')
const validateProperty = require('@tradle/validate').models.property
const metadataProperties = validateProperty.metadataProperties

module.exports = function builder () {
  const property = {}
  const api = {
    toJSON
  }

  metadataProperties.forEach(p => {
    api[p] = function set (value) {
      property[p] = value
      if (p === 'ref' && value === 'tradle.Photo') {
        api.range('photo')
      }

      return api
    }
  })

  return api

  function toJSON () {
    // validateProperty(property)
    return clone(property)
  }
}
