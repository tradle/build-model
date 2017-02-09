const clone = require('clone')
const validateModels = require('@tradle/validate').models
const validateModel = validateModels.model
const metadataProperties = validateModel.metadataProperties
// const TYPE = '_t'
// const SIG = '_s'
const FORM = 'tradle.Form'
// const VERIFICATION = 'tradle.Verification'
const MY_PRODUCT = 'tradle.MyProduct'
const PRODUCT = 'tradle.FinancialProduct'

module.exports = function builder ({ models }) {
  validateModels(models)

  const model = {
    type: 'tradle.Model',
    properties: {}
  }

  const api = {
    properties: setProperties,
    subClassOf,
    toJSON
  }

  function subClassOf (id) {
    model.subClassOf = id
    if (isMessage(id)) {
      if (model.interfaces) {
        model.interfaces.push('tradle.Message')
      } else {
        api.interfaces(['tradle.Message'])
      }
    }

    return api
  }

  function setProperty (name, prop) {
    model.properties[name] = typeof prop.toJSON === 'function' ? prop.toJSON() : prop
    return api
  }

  function setProperties (obj) {
    for (let prop in obj) {
      setProperty(prop, obj[prop])
    }

    return api
  }

  metadataProperties.forEach(key => {
    if (key in api) return

    api[key] = function set (val) {
      model[key] = val
      return api
    }
  })

  return api

  function toJSON () {
    const copy = clone(model)
    if (typeof copy.title === 'undefined') {
      copy.title = guessTitle(copy.id)
    }

    validateModels(models.concat(copy))
    return copy
  }
}

function isMessage (id) {
  return id === MY_PRODUCT || id === FORM || id === PRODUCT
}

function guessTitle (id) {
  const last = id.split('.').pop()
  const parts = splitCamelCase(last).join(' ')
  return parts[0].toUpperCase() + parts.slice(1)
}

function splitCamelCase (str) {
  return str.split(/(?=[A-Z])/g)
}
