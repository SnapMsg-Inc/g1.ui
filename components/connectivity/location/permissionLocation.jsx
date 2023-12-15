import * as Location from 'expo-location';
import { PermissionsAndroid } from 'react-native';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

export const GetPermission = async () =>
    await Location.requestForegroundPermissionsAsync()

export const CurrentPosition = (configLocation) =>
    Location.getCurrentPositionAsync(configLocation)

export const ReverseGeocode = (coordinates) => 
    Location.reverseGeocodeAsync({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
    })

export const GeocodeWithLocalityAndCountry = (locality, country) =>
    Location.geocodeAsync(`${locality} ${country}`)