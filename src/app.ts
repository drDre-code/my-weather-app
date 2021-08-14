import path from 'path';
import express from 'express';
import hbs from 'hbs';
import { forecast } from './utils/forecast';
import { geocode } from './utils/geocoding';


const app = express();
//setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ebenezer Akinkahunsi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ebenezer Akinkahunsi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text',
        name: 'Ebenezer Akinkahunsi'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    const location = req.query.address as string;
    geocode(location, (error: string | undefined, returnValue: { [key: string]: string | number } | string | undefined) => {
        if (error) {
            return res.send({ errorMessage: error })
        }
        const { latitude, longitude, location } = returnValue as { [key: string]: string | number }
        forecast(+latitude, +longitude, (error: string | undefined, forecastData: string | undefined) => {
            if (error) {
                return res.send({ errorMessage: error })
            }
            res.send({
                forecast: forecastData,
                location
            })
        })
    })
})

app.get('/help*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ebenezer Akinkahunsi',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ebenezer Akinkahunsi',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => console.log('listening'))