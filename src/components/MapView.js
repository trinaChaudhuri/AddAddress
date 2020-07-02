import React from 'react';
import { Dimensions } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const MyMapView = (props) => {
    return (
        <MapView
            style={{ height:windowHeight/1.7,marginTop:120 }}
            region={props.region}
            onRegionChange={(reg) => props.onRegionChange(reg)}>

            <Marker
                coordinate={props.region} />
        </MapView>
    )
}
export default MyMapView;