const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const response1 = document.querySelector('#response1')
const response2 = document.querySelector('#response2')
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault(); //prevents the default pattern of forms to automatically refresh
    response1.textContent = 'loading...'
    response2.textContent = ''
    const address = input.value
    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => response.json()).then(data => {
        if (data.errorMessage) {
            response1.textContent = data.errorMessage
        } else {
            response1.textContent = data.location
            response2.textContent = data.forecast
        }
    })
})