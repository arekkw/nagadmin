import GoogleMapMarkerView from '../google-map/marker';

export default GoogleMapMarkerView.extend({
  googleEvents: { 
      dragend: 'moveMarker'
  }
});