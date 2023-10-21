import * as Location from 'expo-location';

export const GetPermission = () => {
    const { status } = Location.requestForegroundPermissionsAsync()
    if (status !== 'granted'){
        return
    }
}

export const CurrentPosition = (configLocation) =>
    Location.getCurrentPositionAsync(configLocation)

export const ReverseGeocode = (coordinates, setLocality, setCountry) => {
    Location.reverseGeocodeAsync({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
    }).then((address)=> {
        const {city, country} = address[0]
        setLocality(city)
        setCountry(country)
    }).catch((error) => {
        console.log(error)
    })
}

export const GeocodeWithLocalityAndCountry = (locality, country, setCoordinates) => {
    Location.geocodeAsync(`${locality} ${country}`)
    .then((geocodeLocation)=> {
        console.log(`geoLocation ${JSON.stringify(geocodeLocation)}`)
        if (!geocodeLocation.length)
            setCoordinates({ 'latitude': 0, 'longitude': 0})
        else {
            setCoordinates({'latitude': geocodeLocation[0].latitude,
                            'longitude': geocodeLocation[0].longitude})
        }
    })
    .catch((error) => {
        console.log(error)
    })
}