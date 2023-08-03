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
    data: arrBreedsId,
  });
});

selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
  .then(data =>console.log (data))
  
  .then(data => (divCatInfo.innerHTML=createMarkup(data[0]))
  
  )
  .catch(onFetchError);
};

function createMarkup(arr) {
  
  return arr.map(
    ({[0]:{url}, [0]:{breeds,[0]:{name,description,temperament }}}) =>
      `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div>
      <div class="box">
      <h1>${breeds[0].name}</h1>
      <p>${breeds[0].description}</p>
      <p><b>Temperament:</b> ${breeds[0].temperament}</p>
      </div>`
  ).join('')
}
function onFetchError(error){
  Notify.failure( `Oops! Something went wrong! Try reloading the page!`,{
    timeout:5000,
    position: 'center-center',
  });
};