import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import './css/styles.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

// fetchBreeds().then(data=> console.log(data))

const selector = document.querySelector('.breed-select');
const divCatInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
divCatInfo.classList.add('is-hidden');

let arrBreedsId = [];
fetchBreeds().then(data => {
  data.forEach(element => {
    arrBreedsId.push({ text: element.name, value: element.id });
  });

  new SlimSelect({
    select: selector,
    data: arrBreedsId
  });
});




selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
   
    const breedId = event.currentTarget.value;
    // fetchCatByBreed(breedId)
    // .then((data) => {(divCatInfo.innerHTML=createMarkup())
       
    // })
    // .catch(onFetchError);
};


// function createMarkup(arr) {
//   return arr.map(
//     ({url, breeds:{name,description,temperament }}) =>
//       `<div class="box-img"><img src="${url}" alt="${breeds.name}" width="400"/></div>
//       <div class="box">
//       <h1>${breeds.name}</h1>
//       <p>${breeds.description}</p>
//       <p><b>Temperament:</b> ${breeds.temperament}</p>
//       </div>`
//   ).join('')
// }
