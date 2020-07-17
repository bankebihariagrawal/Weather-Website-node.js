console.log('Client side javascript file is loaded');
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const msg3 = document.querySelector('#msg3')
const msg4 = document.querySelector('#msg4')
const msg5 = document.querySelector('#msg5')
const msg6 = document.querySelector('#msg6')
const info = document.querySelector('#info')
const icon = document.querySelector('#icon')


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault(); 
    const location = search.value    
    document.querySelector('#info').style.visibility  = "hidden"
    document.querySelector('.loading').innerHTML = "Information is on the way..."  
   fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            document.querySelector('.loading').innerHTML = data.error
        }
        else{
            document.querySelector('.loading').innerHTML = "" 
        document.querySelector('#info').style.visibility  = "visible"
            msg1.innerHTML = data.location
            msg2.innerHTML = data.temperature + "°C"
            msg3.innerHTML = data.precip + " % chance of rain"
            msg5.innerHTML = data.summary
            msg4.innerHTML = data.humidity
            msg6.innerHTML = "More Details on " + location.toUpperCase() + ' Weather'
            msg6.setAttribute('href' , 'http://api.weatherstack.com/forecast?access_key=c11e7b21b807a8c983155e47a63972ab&query=' + location)
            icon.setAttribute('src',data.icon)


        }
    })
})
search.value=""
})