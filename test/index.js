const test = require('tape')
const models = require('@tradle/models')
const validate = require('@tradle/validate').models
const builders = require('../')

test('basic', function (t) {
  const model = builders.model({ models })
    .id('tradle.BlahProduct')
    .subClassOf('tradle.FinancialProduct')
    .forms(['tradle.AboutYou'])
    .properties({
      blah: builders.property()
        .type('string')
        .readOnly(true)
        .title('No, really, blah'),
      blahblah: builders.property()
        .type('date'),
      blahblahblah: builders.property()
        .type('object')
        .ref('tradle.Photo')
    })
    .toJSON()

  t.doesNotThrow(function () {
    validate.model(model)
  })

  t.doesNotThrow(function () {
    validate(models.concat(model))
  })

  t.end()
})
