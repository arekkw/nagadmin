import Ember from 'ember';
import dateHelpers from '../utils/date-helpers';

export default Ember.Handlebars.makeBoundHelper(function(date, format) {
    if(!date) {return "--";}
    return dateHelpers(date, format);
});
