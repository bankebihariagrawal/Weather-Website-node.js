const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000
//Define paths for express config 
const publicDirPath = path.join(__dirname , '../public/')
const viewPath = path.join(__dirname , '../templates/views')
const partialpath = path.join(__dirname , '../templates/partials')
// our site is static but we want to make it dynamic so we use set and in set first argument is the setting name(there is few but we use view engine) and second
// argument is the name of module we install and that name is hbs
// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialpath)
// route the file that placed in other directory
// line 22 use to get the all page (about , help ,index) on server 
// in server you type localhost:3000/about.html etc.
// Setup static directory to serve
app.use(express.static(publicDirPath))

// now we delete index.html and make a index.hbs in views folder so it now we render it here and in this we pass argument to that file
app.get('' , (req , res) => {
    res.render('index', {
        title:'Weather app',
        name:'banke'
    })
})
app.get('/about' , (req , res) => {
    res.render('about',{
    title:'About ',
    name:'banke'
})
})

app.get('/help' , (req , res) => {
    res.render('help',{
        helptext:'For weather information Go to weather page and search for your desired Place',      
        title:'Help',
        name:'banke'    
    })
})
// routing by get and send

app.get('/weather' , (req , res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address , (error , {latitude , longitude , location} = {}) => {
        if(error){
        return res.send({error})
        }
        
        forecast(longitude, latitude , (error, {oberservation_time , icon , temperature , summary , precip ,humidity}) => {
        if(error){
            return res.send({error})
        }
        res.send({oberservation_time,
            temperature,
            summary,
            precip,
            humidity,
            location,
            icon,
            address:req.query.address})
    })
    })
})

app.get('/products' , (req , res) => {
    if(!req.query.search) {
       return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:404,
        error:'Help article not found',
        name:'Banke'
    })
})
// if anything that we write(means /help , /about , /) is don't match then ihis get is run
// ex if we write localhost:3000//me then this page run
app.get('*',(req,res) => {
res.render('404' , {
    title:404,
    error:'Page not found',
    name:'banke'
})
})

app.listen( port , () => {
    console.log('Server is up on port' + port + '.')
})