import Ember from 'ember';
import EmberCloudFS from 'nag-admin/components/ember-cloud-fs';

export default EmberCloudFS.extend({
	didInsertElement : function(){
	    this._super();
	    Ember.run.later(this, this.initColorBox, 700); //hack. Ideas?
	},
	
	actions: {
        refresh: function(){
            this.listFiles(this.get('prefix'));
            Ember.run.later(this, this.initColorBox, 700); //hack. Ideas?
        }
    },
	
    initColorBox: function(){
        var $overflow = '';
		var colorbox_params = {
			rel: 'colorbox',
			reposition:true,
			scalePhotos:true,
			scrolling:false,
			previous:'<i class="ace-icon fa fa-arrow-left"></i>',
			next:'<i class="ace-icon fa fa-arrow-right"></i>',
			close:'&times;',
			current:'{current} of {total}',
			maxWidth:'100%',
			maxHeight:'100%',
			onOpen:function(){
				$overflow = document.body.style.overflow;
				document.body.style.overflow = 'hidden';
			},
			onClosed:function(){
				document.body.style.overflow = $overflow;
			},
			onComplete:function(){
				Ember.$.colorbox.resize();
			}
		};
		Ember.$('.ace-thumbnails [data-rel="colorbox"]').colorbox(colorbox_params);
    }
});
