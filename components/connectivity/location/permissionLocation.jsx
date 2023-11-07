import * as Location from 'expo-location';

export const GetPermission = () => {
    const { status } = Location.requestForegroundPermissionsAsync()
    if (status !== 'granted'){
        return
    }
}

export const CurrentPosition = (configLocation) =>
    Location.getCurrentPositionAsync(configLocation)

export const ReverseGeocode = (coordinates) => 
    Location.reverseGeocodeAsync({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
    })

export const GeocodeWithLocalityAndCountry = (locality, country) =>
    Location.geocodeAsync(`${locality} ${country}`)