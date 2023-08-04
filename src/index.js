import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import './styles.css';
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
fetchBreeds()
  .then(data => {
    data.forEach(element => {
      arrBreedsId.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: selector,
      data: arrBreedsId,
    });
  })
  .catch(onFetchError);

selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
  loader.classList.replace('is-hidden', 'loader');
  selector.classList.add('is-hidden');
  divCatInfo.classList.add('is-hidden');

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.replace('loader', 'is-hidden');
      selector.classList.remove('is-hidden');

      divCatInfo.innerHTML = createMarkup(data[0]);
      divCatInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}

function createMarkup(data) {
  const {
    url,
    breeds: [{ name, description, temperament }],
  } = data;

  return `<div class="box-img"><img src="${url}" alt="${name}" width="400"/></div>
      <div class="box">
      <h1>${name}</h1>
      <p>${description}</p>
      <p><b>Temperament:</b> ${temperament}</p>
      </div>`;
}

function onFetchError(error) {
  selector.classList.remove('is-hidden');
  loader.classList.replace('loader', 'is-hidden');

  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-center',
      timeout: 5000,
    }
  );
}
