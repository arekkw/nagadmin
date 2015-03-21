import DS from 'ember-data';

export default DS.Model.extend({
    org: DS.belongsTo('organizations/org',{ async: true}),
    createDate: DS.attr('date', {defaultValue: new Date()}),
    lastUpdateDate: DS.attr('date')
});
