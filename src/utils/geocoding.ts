import request from 'request';



export const geocode = (location: string, callback: (a: string | undefined, b: string | undefined | { [key: string]: string }) => void) => {
    const address = location.split(' ').map((word: string) => {
        let txt = word.split('')
        let initial = txt.splice(0, 1)
        let final = initial.join('').toUpperCase() + txt.join('').toLowerCase()
        return final
    }).join(' ')
    const geoid = process.env.AMB
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${geoid}`

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}