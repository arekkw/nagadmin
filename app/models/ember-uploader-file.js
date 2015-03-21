import Ember from 'ember';
import { resizeImage } from 'nag-admin/helpers/resize-image';
import { humanReadableFileSize } from 'nag-admin/helpers/human-readable-file-size';
import config from '../config/environment';

export default Ember.Object.extend({
   init: function() {
        this._super();
        Ember.assert("File to upload required on init.", !!this.get('fileToUpload'));
        this.set('uploadPromise', Ember.Deferred.create());
    },
    
    imageResized: function(){
        var self = this;
        var fileToUpload = this.get('resizedImage');
        this.set('fileToUpload', fileToUpload);
        var isImage = fileToUpload.type.indexOf('image') === 0;
        this.set('rawSize', fileToUpload.size);
        this.set('size', humanReadableFileSize(fileToUpload.size));
        
        // Don't read anything bigger than 1 MB
        if(isImage && fileToUpload.size < 0.5*1024*1024) {
            this.set('isDisplayableImage', isImage);

            // Create a reader and read the file.
            var reader = new FileReader();
            reader.onload = function(e) {
                self.set('base64Image', e.target.result);
            };
            // Read in the image file as a data URL.
            reader.readAsDataURL(fileToUpload);
        }
    }.observes("resizedImage"),
    
    readFile: function() {
        var fileToUpload = this.get('fileToUpload');
        var name = fileToUpload.name;
        if(this.get('fileNameOverride')){
            name = this.get('fileNameOverride');
        }
        this.set('name', name);
        
        resizeImage(this, fileToUpload, 800);
        
        this._super();
    }.on('init'),

    // ...........................................
    // prefix used on the name of the object
    prefix: '',
    
    // Name is used for the upload property
    name: '',
    
    // {Property} Human readable size of the selected file
    size: "0 KB",
    
    // {Property} Raw file size of the selected file
    rawSize: 0,

    // {Property} Indicates if this file is an image we can display
    isDisplayableImage: false,
    
    // {Property} String representation of the file
    base64Image: '',
    
    // {Property} Will be an HTML5 File
    fileToUpload: null,
    
    // {Property} Will be a $.ajax jqXHR 
    uploadJqXHR: null,
    
    // {Property} Promise for when a file was uploaded
    uploadPromise: null,
    
    // {Property} Upload progress 0-100 
    uploadProgress: null,
    
    // {Property} If a file is currently being uploaded
    isUploading: false,
    
    // {Property} If the file was uploaded successfully
    didUpload: false,
    
    // ..........................................................
    // Actually do something!
    //    
    uploadFile: function(accessToken) {
        if(this.get('isUploading') || this.get('didUpload') || this.get('didError')) { 
            return this.get('uploadPromise');
        }
        
        var fileToUpload = this.get('fileToUpload');
        var prefix = this.get('prefix');
        var name = prefix + '/' + this.get('name');
        var params = '?uploadType=multipart';
        params+='&predefinedAcl=publicRead';
        params+='&project=' + config.cloudStorageProjectId;
        
        var self = this;
        this.set('isUploading', true);
        var meta = {};
        meta.cacheControl = "public, max-age=604800";
        meta.name = name;
        meta.contentDisposition = "inline;filename=" + name; 
        
        //need to read the file in order to build array buffer for multipart/related
        var reader = new FileReader();
        reader.readAsArrayBuffer(fileToUpload);
        reader.onload = function(event) {
            var _data = self._gen_multipart(meta, event.target.result, fileToUpload.type);
            
            Ember.$.ajax({
                url: config.cloudStorageUpload + params,
                type: "POST",
                data: _data,
                beforeSend: function (request)
                {
                    request.setRequestHeader('Content-Type', 'multipart/related; boundary="boundary"');
                    request.setRequestHeader('Authorization', 'Bearer ' + accessToken);
                },
                processData: false,
                contentType: false,
                xhr: function() {
                    var xhr = Ember.$.ajaxSettings.xhr() ;
                    xhr.upload.onprogress = function(evt) { 
                        self.set('progress', (evt.loaded/evt.total*100));
                    };
                    return xhr ;
                }
            }).done(function(data) {
                var value = "";
                try {
                    value = data.mediaLink;
                } catch(e) { }
                self.set('isUploading', false);
                self.set('didUpload', true);
                self.get('uploadPromise').resolve(value);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                self.set('isUploading', false);
                self.set('didError', true);
                self.get('uploadPromise').reject(errorThrown);
            });
        };
        
        return this.get('uploadPromise');
    },
    
    _gen_multipart: function(body, file, type) {
        file = new Uint8Array(file); // Wrap in view to get data
    
        var before = ['--boundary\n',
                        'Content-Type: application/json; charset=UTF-8\n\n',
                        JSON.stringify(body), 
                        '\n\n--boundary\n',
                        'Content-Type:', type, "\n\n"].join('');
        var after = '\n--boundary--';
        var size = before.length + file.byteLength + after.length;
        var uint8array = new Uint8Array(size);
        var i = 0;
    
        // Append the string.
        for (; i<before.length; i++) {
            uint8array[i] = before.charCodeAt(i) & 0xff;
        }
    
        // Append the binary data.
        for (var j=0; j<file.byteLength; i++, j++) {
            uint8array[i] = file[j];
        }
    
        // Append the remaining string
        for (var k=0; k<after.length; i++, k++) {
            uint8array[i] = after.charCodeAt(k) & 0xff;
        }
        return uint8array.buffer; // <-- This is an ArrayBuffer object!
    },
    
    showProgressBar: Ember.computed.or('isUploading', 'didUpload'),

    progressStyle: function() {
        return 'width: %@%'.fmt(this.get('progress'));
    }.property('progress')
});
