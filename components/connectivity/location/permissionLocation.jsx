import * as Location from 'expo-location';

export const getPermission = () => {
    const { status } = Location.requestForegroundPermissionsAsync()
    if (status !== 'granted'){
        return
    }
}

export const CurrentPosition = (configLocation) =>
    Location.getCurrentPositionAsync(configLocation)