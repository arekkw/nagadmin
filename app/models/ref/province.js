import DS from 'ember-data';

export default DS.Model.extend({
    "display": DS.attr('string'),
    "districts": DS.attr(),
    "metros": DS.attr()
});
