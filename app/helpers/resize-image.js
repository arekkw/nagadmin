import Ember from 'ember';

export function resizeImage(parent, file, maxSize) {
    
    // Ensure it's an image
    if(file.type.match(/image.*/)) {
        console.log('An image has been loaded');
        
        // Load the image
        var reader = new FileReader();
        reader.onload = function (readerEvent) {
            var image = new Image();
            image.onload = function () {
                // Resize the image
                var canvas = document.createElement('canvas'),
                    max_size = maxSize,
                    width = image.width,
                    height = image.height;
                if (width > height) {
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                        width *= max_size / width;
                        height = max_size;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                var dataUrl = canvas.toDataURL('image/jpeg');
                var resizedImage = dataURLToBlob(dataUrl);
                parent.set('resizedImage', resizedImage);
            };
            image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
    }
}

export function dataURLToBlob(dataURL) {
    var BASE64_MARKER = ';base64,',parts,contentType,raw;
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
        parts = dataURL.split(',');
        contentType = parts[0].split(':')[1];
        raw = parts[1];

        return new Blob([raw], {type: contentType});
    }

    parts = dataURL.split(BASE64_MARKER);
    contentType = parts[0].split(':')[1];
    raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
}

export default Ember.Handlebars.makeBoundHelper(resizeImage);
