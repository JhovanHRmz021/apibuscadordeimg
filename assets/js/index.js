const inpBuscar = document.querySelector('.inpBuscar');
const btnBuscar = document.querySelector('.btnBuscar');
const contenedorImg = document.querySelector('.contenedorImg');
const ACCESS_KEY = "U8lt5FD3dMNv2qbX0TVdMW3q4h7UXRLVw6Xsut8YQV8"; // Reemplaza con tu Access Key de Unsplash

btnBuscar.addEventListener("click", () => {
    const palabra = inpBuscar.value.trim();
    if (!palabra) {
        alert('Ingresa el contenido que deseas buscar');
        return;
    }
    searchImg(palabra);
});

let currentPage = 1; // Página actual

async function searchImg(palabra, page = 1) {
    const clave = palabra.replace(/ /g, "+");
    const url = `https://api.unsplash.com/search/photos?query=${clave}&per_page=10&page=${page}&client_id=${ACCESS_KEY}`;
    try {
        const response = await fetch(url);
        const datos = await response.json();
        renderImg(datos.results); // Muestra las imágenes
    } catch (error) {
        console.error("Error al realizar la petición:", error);
    }
}

// Botones para cambiar de página
document.querySelector(".btnNext").addEventListener("click", () => {
    if (currentPage < 5) {
        currentPage++;
        searchImg(inpBuscar.value, currentPage);
        if (currentPage === 5) {
            document.querySelector(".btnNext").disabled = true; // Desactiva el botón
        }
    }
});

// Reactivar el botón "Siguiente" al regresar de la página 5
document.querySelector(".btnPrev").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        searchImg(inpBuscar.value, currentPage);
        document.querySelector(".btnNext").disabled = false; // Reactiva el botón
    }
});



function renderImg(imgenes) {
    contenedorImg.innerHTML = '';
    imgenes.forEach(imgen => {
        const { id, urls, alt_description, user } = imgen;

        // Crear el contenedor para la imagen y el texto
        const divImagen = document.createElement('div');
        divImagen.classList.add('imagenCard'); // Clase para estilos

        // Crear la imagen
        const img = document.createElement('img');
        img.src = urls.regular;
        img.alt = alt_description || 'Imagen sin descripción';
        img.id = id;

        // Crear el texto superpuesto
        const overlayText = document.createElement('div');
        overlayText.classList.add('overlay-text');
        const autor = `Autor: ${user.name || 'Desconocido'}`;
        overlayText.textContent = autor;


        // Añadir la imagen y el texto al contenedor
        divImagen.appendChild(img);
        divImagen.appendChild(overlayText);

        // Añadir el contenedor al DOM
        contenedorImg.appendChild(divImagen);
    });
}


// function mostrarImagenes(imagenes) {
//     // Limpia el contenedor antes de agregar nuevas imágenes
//     contenedorImg.innerHTML = '';

//     // Itera sobre las imágenes y crea elementos dinámicamente
//     imagenes.forEach(imagen => {
//         const { id, urls, alt_description } = imagen;

//         // Crea un div contenedor para la imagen
//         const divImagen = document.createElement('div');
//         divImagen.classList.add('imagen-card'); // Clase opcional para estilos

//         // Crea la etiqueta img
//         const img = document.createElement('img');
//         img.src = urls.regular; // URL de la imagen
//         img.alt = alt_description || 'Imagen sin descripción'; // Alt de la imagen
//         img.id = id; // ID único

//         // Crea un párrafo para la descripción (opcional)
//         const descripcion = document.createElement('p');
//         descripcion.textContent = alt_description || 'Sin descripción disponible';

//         // Añade la imagen y descripción al div contenedor
//         divImagen.appendChild(img);
//         divImagen.appendChild(descripcion);

//         // Añade el div contenedor al contenedor principal
//         contenedorImg.appendChild(divImagen);
//     });
//}
