import DS from 'ember-data';

export default DS.Model.extend({
    address1: DS.attr('string'),
    address2: DS.attr('string'),
    province: DS.belongsTo('ref/province', { async: true }),
    district: DS.attr('string'),
    metro: DS.attr('string'),
    muni: DS.attr('string'),
    ward: DS.attr('string'),
    lat: DS.attr(),
    lng: DS.attr(),
    createDate: DS.attr('date', { defaultValue: new Date() }),
    lastUpdateDate: DS.attr('date')
});