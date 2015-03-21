import Ember from 'ember';
import { humanReadableFileSize } from 'nag-admin/helpers/human-readable-file-size';
import EmberUploadFile from 'nag-admin/models/ember-uploader-file';
import EnvironmentMixin from 'nag-admin/mixins/environment';

export default Ember.Component.extend(EnvironmentMixin, {
    allowFileDrop: true,
    uploadFiles: [],
    uploadLogBinding: null,
    dropboxMsg: 'Drop files here or click to choose',
    directory: 'default',
    showLogs: false,

    totalFileSize: function() {
        var total = 0;
        this.get('uploadFiles').forEach(function(file) {
            total += file.get('rawSize');
        });
        return humanReadableFileSize(total);
    }.property('uploadFiles.@each.rawSize'),

    hasOne: function() {
        return this.get('uploadFiles.length') === 1;
    }.property('uploadFiles.length'),

    hasUploads: function() {
        if (this.get('hideOnDrop') && this.get('uploadFiles.length') > 0) {
            this.set('hideDropZone', true);
        }
        else {
            this.set('hideDropZone', false);
        }
        return this.get('uploadFiles.length') > 0;
    }.property('uploadFiles.length'),

    hasCompleted: function() {
        this.set("uploadsComplete", this.get('uploadFiles').findProperty('didUpload'));
        if (this.get('removeCompleted')) {
            return this.get('uploadFiles').findProperty('didUpload');
        }
    }.property('uploadFiles.@each.didUpload'),

    _filesDropped: function(files) {
        var model = this.get('uploadFiles');
        for (var i = 0; i < files.length; i++) {
            var fileUploadModel = EmberUploadFile.create({
                fileToUpload: files[i],
                prefix: this.get('directory'),
                fileNameOverride: this.get('fileNameOverride')
            });
            model.pushObject(fileUploadModel);
        }
    },

    actions: {
        filesDropped: function(files) {
            this._filesDropped(files);
        },
        removeFile: function(file) {
            this.get('uploadFiles').removeObject(file);
        },

        removeCompleted: function() {
            var completed = this.get('uploadFiles').filterProperty('didUpload');
            this.get('uploadFiles').removeObjects(completed);
        },

        uploadFile: function(file) {
            var uploadLog = this.get('uploadLog');
            var accessToken = this.get("accessToken");
            var cacheable = this.get("cacheable");
            if (!accessToken) {
                return;
            }
            file.uploadFile(accessToken, cacheable).then(function(url) {
                uploadLog.pushObject(url);
            });
        },

        uploadAll: function() {
            var uploadLog = this.get('uploadLog');
            var accessToken = this.get("accessToken");
            var cacheable = this.get("cacheable");
            if (!accessToken) {
                return;
            }
            this.get('uploadFiles').forEach(function(item) {
                item.uploadFile(accessToken, cacheable).then(function(url) {
                    uploadLog.pushObject(url);
                });
            });
        }
    },

    didInsertElement: function() {
        var appController = this;
        var removeTimer = null;

        var dragDropEventHasFiles = function(evt) {
            try {
                return evt.dataTransfer.types.contains('Files');
            }
            catch (e) {}
            return false;
        };

        var addDropzoneHighlight = function() {
            appController.set('showDropZoneHighlight', true);
        };

        var removeDropzoneHighlight = function() {
            appController.set('showDropZoneHighlight', false);
        };

        this.$('#' + this.get('compId') + ' span').on('dragover', function() {
            if (removeTimer) {
                Ember.run.cancel(removeTimer);
            }
            removeTimer = null;
        });

        this.$('#' + this.get('compId')).on('click', removeDropzoneHighlight);

        this.$('#' + this.get('compId')).on('dragover', function(evt) {
            if (dragDropEventHasFiles(evt)) {
                addDropzoneHighlight();

                // If it's a file drop, go a head and eat it to prevent navigation
                return false;
            }
        });

        this.$('#' + this.get('compId')).find('input').on('change', function() {
            appController._filesDropped(this.files);
        });

        this.$('#' + this.get('compId')).on('dragleave', function(evt) {
            if (dragDropEventHasFiles(evt)) {
                if (evt.currentTarget.id === 'dropzone') {
                    removeTimer = Ember.run.later(removeDropzoneHighlight, 1);
                }

                // If it's a file drop, eat it to prevent navigation
                return false;
            }
        });

        this.$('#' + this.get('compId')).on('drop', function(evt) {
            removeDropzoneHighlight();

            if (dragDropEventHasFiles(evt)) {
                appController._filesDropped(evt.dataTransfer.files);
                // If it's a file drop, eat it to prevent navigation
                return false;
            }
        }).on('didInsertElement');
    }
});
