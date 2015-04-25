import DS from 'ember-data';

export default DS.Model.extend({
  profile: DS.belongsTo('organizations/profile',{ async: true }),
  infra: DS.belongsTo('organizations/infra',{ async: true }),
  reg: DS.belongsTo('organizations/reg',{ async: true }),
  income: DS.belongsTo('organizations/income',{ async: true }),
  prog: DS.belongsTo('organizations/prog',{ async: true }),
  doc: DS.belongsTo('organizations/doc',{ async: true }),
  gallery: DS.belongsTo('organizations/gallery',{ async: true }),
  orgstatus: DS.belongsTo('ref/orgstatus',{ async: true }),
  createDate: DS.attr('date', {defaultValue: new Date()}),
  lastUpdateDate: DS.attr('date'),
  status: DS.attr('string', {defaultValue: 'active'})
});
