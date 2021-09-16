/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import {Colors} from 'react-native/Libraries/NewAppScreen';
const deg2rad = deg => {
  return deg * (Math.PI / 180);
};
const getDistanceFromLatLonInKm = (loc1, loc2) => {
  const lat1 = loc1?.latitude;
  const lon1 = loc1?.longitude;
  const lat2 = loc2?.latitude;
  const lon2 = loc2?.longitude;
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};

const App = () => {
  const [myRegion, setMyRegion] = useState({
    latitude: 24.871139,
    longitude: 67.024071,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0922,
  });
  const [dragLoc, setDragLoc] = useState({
    latitude: 24.891139,
    longitude: 67.024071,
  });
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* <Header /> */}
        {/* <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}> */}
        {/* <Text>dum dum</Text> */}
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{height: 500}}
          initialRegion={{
            ...myRegion,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0922,
          }}
          // region={myRegion}
          onRegionChange={r => setMyRegion(r)}
          // showsUserLocation={true}
          showsMyLocationButton={true}>
          <Marker coordinate={myRegion} title={'location'} />
          <Marker
            coordinate={{
              latitude: 24.851139,
              longitude: 67.024071,
            }}
            title={'marker2'}
          />
          <Marker
            draggable
            coordinate={dragLoc}
            // onPress={e => console.log('my marker press', e)}
            onDrag={e => {
              console.log('myMarker', e);
              setDragLoc({...e?.nativeEvent?.coordinate});
            }}
            title={'marker2'}
          />
          <Polyline coordinates={[dragLoc, myRegion]} />
        </MapView>
        {/* </View> */}
        <Button
          title="loc1"
          onPress={() => {
            const newLoc = {
              latitude: 24.83139 + (Math.random() - 0.5) * 0.1,
              longitude: 67.044071 + (Math.random() - 0.5) * 0.1,
            };
            console.log(newLoc);
            // setMyRegion({...myRegion, ...newLoc});
            setDragLoc(newLoc);
          }}
        />
        <Text>{getDistanceFromLatLonInKm(myRegion, dragLoc).toFixed(2)}km</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
