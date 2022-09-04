const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
})
api.defaults.headers.common['X-API-KEY'] ='live_ddqyR9Mn5m1fISVdZemsJIL6MlO4kAOrDUC3mREKbPltl5rkrQ0FnvvKEzfLgQ6D'

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';

const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?';

const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload?';

const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/{id}?`;

const DOG_API = 'https://api.thedogapi.com/v1/images/search';


const catError = document.getElementById('error');


async function loadRandomCats() {
    const answer = await fetch(API_URL_RANDOM);
    const data = await answer.json();
    // console.log("Random")
    // console.log(data);

    if (answer.status!== 200 ) {
        catError.innerHTML = 'Hubo un error';
    } else {
        const img1 = document.getElementById('img1');
        const btn1 = document.getElementById('btn1');
        const img2 = document.getElementById('img2');
        const btn2 = document.getElementById('btn2');


        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavorite(data[0].id)
        btn2.onclick = () => saveFavorite(data[1].id)
    }
}

async function loadFavoritesCats() {
    const answer = await fetch(API_URL_FAVORITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'live_ddqyR9Mn5m1fISVdZemsJIL6MlO4kAOrDUC3mREKbPltl5rkrQ0FnvvKEzfLgQ6D'
        }

    });
    const data = await answer.json();
    // console.log("Favorites")
    // console.log(data);

    if (answer.status!== 200 ) {
        catError.innerHTML = 'Hubo un error';
    } else {
        const section = document.getElementById("favorite-cats");
        section.innerHTML = "";
        // const h2 = document.createElement('h2');
        // const h2Text = document.createTextNode('Gatitos Favoritos');
        // h2.appendChild(h2Text);
        // section.appendChild(h2);
        data.forEach(cat => {
            
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar el gato de Favoritos');
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavorite(cat.id);
            // console.log(cat.id)
            img.src = cat.image.url;
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);

        })
    }
}

async function saveFavorite(id) {
    const {data, status} = await api.post('/favourites', {
        image_id: id,
    });
    // const res = await fetch(API_URL_FAVORITES, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-API-KEY': 'live_ddqyR9Mn5m1fISVdZemsJIL6MlO4kAOrDUC3mREKbPltl5rkrQ0FnvvKEzfLgQ6D'
            
    //     },
    //     body: JSON.stringify({
    //         image_id: id,
    //     }),
    // });
    // const data = await res.json();
    // // console.log("SAVE")
    // // console.log(res);
    if (status !== 200 ) {
        catError.innerHTML = 'Hubo un error';
    } else {
        // // console.log("Gato guardado con exito")
        loadFavoritesCats();
    }

} 
async function deleteFavorite(id) {
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': 'live_ddqyR9Mn5m1fISVdZemsJIL6MlO4kAOrDUC3mREKbPltl5rkrQ0FnvvKEzfLgQ6D'
        }
    });
    const data = await res.json(); 
    if (res.status!== 200 ) {
        catError.innerHTML = 'Hubo un error';
    } else {
        // console.log("Gato eliminado con exito")
        loadFavoritesCats();
    }
}


async function uploadCatPhoto() {
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);
    console.log(formData.get('file'));

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'X-API-KEY': 'live_ddqyR9Mn5m1fISVdZemsJIL6MlO4kAOrDUC3mREKbPltl5rkrQ0FnvvKEzfLgQ6D',
        },
        body: formData,
    });
    const data = await res.json();
    if (res.status !== 201) {
        spanError.innerHTML = `Hubo un error al subir michi: {res.status} {data.message}`
    }
    else {
        console.log("Foto de michi cargada :)");
        console.log({ data });
        console.log(data.url);
        saveFavorite(data.id) //para agregar el michi cargado a favoritos.
    }
}

loadRandomCats();
loadFavoritesCats();


async function loadDogs() {
    const answer = await fetch(DOG_API);
    const data = await answer.json();
    // // console.log(data);

    const img3 = document.getElementById('img6');
    img3.src = data[0].url;
   

}
loadDogs();

const file = document.querySelector("#file");
const  showPrev = document.querySelector("#show-prev");

// Escuchar cuando cambie
file.addEventListener("change", () => {
  // Los archivos seleccionados, pueden ser muchos o uno
  const archivos = file.files;
  // Si no hay archivos salimos de la función y quitamos la imagen
  if (!archivos || !archivos.length) {
    showPrev.src = "";
    return;
  }
  // Ahora tomamos el primer archivo, el cual vamos a previsualizar
  const primerArchivo = archivos[0];
  // Lo convertimos a un objeto de tipo objectURL
  const objectURL = URL.createObjectURL(primerArchivo);
  // Y a la fuente de la imagen le ponemos el objectURL
  showPrev.src = objectURL;
});

file.addEventListener("change", () => {
  // Los archivos seleccionados, pueden ser muchos o uno
  const archivos = file.files;
  // Si no hay archivos salimos de la función y quitamos la imagen
  if (!archivos || !archivos.length) {
    showPrev.src = "";
    return;
  }
  // Ahora tomamos el primer archivo, el cual vamos a previsualizar
  const primerArchivo = archivos[0];
  // Lo convertimos a un objeto de tipo objectURL
  const objectURL = URL.createObjectURL(primerArchivo);
  // Y a la fuente de la imagen le ponemos el objectURL
  showPrev.src = objectURL;
});