const request = require('request')

const forecast = (lon , lat , callback) => {
    const url = 'http://api.weatherstack.com/forecast?access_key=c11e7b21b807a8c983155e47a63972ab&query=' + lat +',' + lon
    
    request({url , json:true},(error , {body}) => {
      if(error){
          callback('Unable to connect to weather services',undefined)
      }
      else if(body.error){
          callback('Unable to find location' , undefined)
      }
      else{
          callback(undefined ,{
            observation_time: body.current.observation_time,
            temperature:body.current.temperature,
            summary:body.current.weather_descriptions[0],
            precip:body.current.precip,
            humidity:body.current.humidity,
            icon:body.current.weather_icons[0]
          })
      }
    })
    
    }
    
module.exports = forecast   