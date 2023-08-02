const url = 'https://api.thecatapi.com/v1';
const api_key =
  "live_YrantmFJdAcnPCSJSPc216UJmIO4RjlbPCx294qBLhymUZ3xks2WKYT03y5VCzjt";

export function fetchBreeds() {
  return fetch(`${url}/breeds?api_key=${api_key}`)
  .then(resp => {
   
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}

export function fetchCatByBreed(breedId){
    // https://api.thecatapi.com/v1/images/search
    return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`)
    .then(resp => {
   
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      });
}
