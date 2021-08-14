import request from "request";

export const forecast = (latitude: number, longitude: number, callback: (a: string | undefined, b: string | undefined) => void) => {

    const appid = process.env.OMW
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${appid}`
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to Connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            const data = response.body
            const temperature = data.main.temp
            const feelslike = data.main.feels_like
            const humidity = data.main.humidity

            const info = `${data.weather[0].description}. It is currently ${temperature} degrees celsius out. It feels like ${feelslike} degrees celsius out with humidity of ${humidity}%`
            callback(undefined, info)
        }
    })
}

