import * as React from 'react';
// custom stylesheet :
import '../../component-styles/scaffold-styles.css';
/////////////////////////////////////////////////////////////////////////////////////////

export interface OwnProps {
// These are props the component creates and maintains within itself &&/ from its parent component
// e.g. what you write in <ExampleComponent ...>
  initialCenter: any,
}
export interface StateProps {
// Props that are set by mapStateToProps
}
export interface DispatchProps {
// Props that are set by mapDispatchToProps
}
export type Props = OwnProps & StateProps;

export interface State {
  // The components optional internal state
  zoom: number,
}

class Geolocator extends React.Component<Props, State> {
  state = { zoom: 10 };

  // ref='mapCanvas'
  render () {
    return (
      <div className='geolocator'>
        <div className='geolocator-canvas'/>
      </div>
    );
  }
  //
  // componentDidMount() {
  //   // create the map, marker and infoWindow after the component has
  //   // been rendered because we need to manipulate the DOM for Google =(
  //   const map = map.bind(this);
  //   map = this.createMap();
  //   const marker = marker.bind(this);
  //   marker = this.createMarker();
  //   const infoWindow = infoWindow.bind(this);
  //   infoWindow = this.createInfoWindow();
  //
  //   // have to define google maps event listeners here too
  //   // because we can't add listeners on the map until its created
  //   google.maps.event.addListener(map, 'zoom_changed', ()=> this.handleZoomChange());
  // }
  //
  // // clean up event listeners when component unmounts
  // componentDidUnMount() {
  //   google.maps.event.clearListeners(map, 'zoom_changed');
  // }
  //
  // createMap() {
  //   let mapOptions = {
  //     zoom: this.state.zoom,
  //     center: this.mapCenter()
  //   }
  //   return new google.maps.Map(this.refs.mapCanvas, mapOptions);
  // }
  //
  // mapCenter() {
  //   return new google.maps.LatLng (
  //     this.props.initialCenter.lat,
  //     this.props.initialCenter.lng
  //   );
  // }
  //
  // createMarker() {
  //   return new google.maps.Marker({
  //     position: this.mapCenter(),
  //     map: map
  //   });
	// }
  //
  // createInfoWindow() {
  //   let contentString = "<div class='InfoWindow'>National Bank</div>";
  //   return new google.maps.InfoWindow({
  //     map: map,
  //     anchor: marker,
  //     content: contentString
  //   });
  // }
  //
  // handleZoomChange() {
  //   this.setState({
  //     zoom: map.getZoom()
  //   });
  // }
}

export default Geolocator;
