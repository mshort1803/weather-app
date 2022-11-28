console.log('Client side javascript is loaded');

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//   response.json().then((data) => {
//     console.log(data)
//   })
// })

const form = document.querySelector('form');
const searchBox = document.querySelector('input');
const messageOne = document.getElementById('message1');
const messageTwo = document.getElementById('message2');

messageOne.textContent = ''
messageTwo.textContent = ''

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = searchBox.value;
  fetchWeather(location);
});

const fetchWeather = address => {
  url = '/weather?address=' + address;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if(data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.data;
      }
    });
  });
};
