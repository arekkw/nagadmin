import Ember from 'ember';
import CloudFile from 'nag-admin/models/ember-cloud-fs-file';
import config from '../config/environment';

export default Ember.Component.extend({
    folders:[],
    files:[],
    prefix:null,
    isLoading:true,
    
    actions: {
        refresh: function(){
            this.listFiles(this.get('prefix'));
        },
        deleteFile: function(objectPath){
            this.deleteFile(objectPath);
        },
        loadPrefix: function(prefix){
            this.listFiles(prefix);
        }
    },
    
    parentPrefix: function(){
        var temp = this.get('prefix');
        if(!temp){
            console.debug('Parent: NA (at root)');
            return false;
        } if(temp.indexOf('/') === temp.length-1){
            console.debug('Parent: root');
            return ' ';
        } else {
            temp = temp.substr(0, temp.length-1); // strip trailing /
            temp = temp.substr(0, temp.lastIndexOf('/'));
            console.debug('Parent: ' + temp);
            return temp+='/'; // add trailing slash
        }
    }.property('prefix'),
    
    listFiles: function(prefix) {
        if(!prefix){
            prefix = this.get('prefix');
        }
        this.set('isLoading', true);
        var accessToken = this.get("accessToken");
        var params = '?project=' + config.cloudStorageProjectId;
        params+='&delimiter=/';
        if(prefix){
            prefix=prefix.trim();
            this.set('prefix', prefix);
            if(prefix.indexOf("/", prefix.length - 1) === -1){
                prefix+="/";
            }
            params+='&prefix='+prefix;
        }
        
        var self = this;
        Ember.$.ajax({
            url: config.cloudStorageDownload + params,
            type: "GET",
            cache: true,
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Bearer " + accessToken);
            }
        }).done(function(data) {
            var cloudFiles = [];
            if(data.items){
                Ember.$.each(data.items, function(idx, item){
                    var cloudFile = CloudFile.create({ file: item, 'accessToken': accessToken });
                    cloudFiles.push(cloudFile);
                });
            }
            self.set('folders', data.prefixes);
            self.set('files', cloudFiles);
            if(!data.prefixes && !data.items){
                self.set('noFiles',true);
            } else {
                self.set('noFiles',false);
            }
            self.set('isLoading', false);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown + ': '+ textStatus);
            self.set('isLoading', false);
        });
    }.on('didInsertElement'),
    
    deleteFile: function(objectPath) {
        var accessToken = this.get("accessToken");
        var params = '?project=' + config.cloudStorageProjectId;
        var self = this;
        Ember.$.ajax({
            url: config.cloudStorageDownload + encodeURIComponent(objectPath) + params,
            type: "DELETE",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Bearer " + accessToken);
            }
        }).done(function() {
            self.listFiles(self.get('prefix'));
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown + ': '+ textStatus);
        });
    }
});