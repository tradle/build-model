const builders = require('./')
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
