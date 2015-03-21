import Ember from 'ember';
import {humanReadableFileSize} from 'nag-admin/helpers/human-readable-file-size';

export default Ember.Object.extend({
   init: function() {
        this._super();
        Ember.assert("File required on init.", !!this.get('file'));
        
        //TODO: move to RSVP.Promise (http://emberjs.com/api/classes/RSVP.Promise.html)
        this.set('uploadPromise', Ember.Deferred.create());
    },
    
    readFile: function() {
        var file = this.get('file');
        var accessToken = this.get('accessToken');
        var prefix = this.get('prefix');
        var name = file.name;
        
        //remove folderPrefix
        if(prefix && prefix.length > 0){
            var start = name.indexOf(prefix) + prefix.length;
            name = name.substr(start);
        }
        this.set('name', name);
        this.set('contentType', file.contentType);
        this.set('rawSize', file.size);
        this.set('size', humanReadableFileSize(file.size));
        this.set('url', file.mediaLink + '&access_token=' + accessToken);
        this.set('uploadDate',file.updated);
    }.on('init')
});

