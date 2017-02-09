const test = require('tape')
const models = require('@tradle/models')
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

    console.log(JSON.stringify(model, null, 2))
    t.end()
})
