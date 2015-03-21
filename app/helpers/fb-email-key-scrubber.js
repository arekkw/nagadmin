import Ember from 'ember';

export function fbEmailKeyScrubber(email) {
  return email.replace(/\./g, "|");
}

export default Ember.Handlebars.makeBoundHelper(fbEmailKeyScrubber);
