export function initialize(container, application) {
  application.deferReadiness();
  var store = container.lookup('store:main');
  store.unloadAll('ref/daysOfWeek');
  var dow = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  dow.forEach(function(day){
    store.createRecord('ref/daysOfWeek', {id:day.camelize(), d:day});
  });
  application.advanceReadiness();
}

export default {
  name: 'load-static-models',
  after: 'store',
  initialize: initialize
};
