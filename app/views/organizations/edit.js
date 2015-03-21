import Ember from 'ember';

export default Ember.View.extend({
    _successMsg: function(){
        var self = this;
        var msg = this.get('controller.successMsg');
        if(msg && msg.length >0){
            Ember.$('#org-edit .alert-success').removeClass('hide').show( 300 ).delay( 2000 ).fadeOut( 400, function(){
                self.set('controller.successMsg', null);
            });
        }
    }.observes('controller.successMsg'),
    
    _errorMsg: function(){
        var self = this;
        var msg = this.get('controller.successMsg');
        if(msg && msg.length >0){
            Ember.$('#org-edit .alert-error').removeClass('hide').show( 300 ).delay( 2000 ).fadeOut( 400, function(){
                self.set('controller.errorMsg', null);
            });
        }
    }.observes('controller.errorMsg')
});
