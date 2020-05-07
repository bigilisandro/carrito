// VARIABLES

const carrito = document.getElementById('carrito')

const cursos = document.getElementById('lista-cursos')

const listaCursos = document.querySelector('#lista-carrito tbody')

const vaciarCarritoBtn = document.getElementById('vaciar-carrito')

// LISTENERS

cargarEventListeners();

function cargarEventListeners() {
    // dispara cuando se presiona "Agregar Carrito"
    cursos.addEventListener('click', comprarCurso)
    // cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso)
    // al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
    // al cargar el documento mostrar Local Storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage)
}




// FUNCIONES

// función que añade el curso al carrito
function comprarCurso(e) {
    // previene la acción por defecto
    e.preventDefault();
    // delegation para agregar carrito
    if(e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        // enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}

// lee los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);
}

// muestra el curso seleccionado en el carrito
function insertarCarrito(curso) {
    const row = document.createElement('tr')
    row.innerHTML = `
        <td> 
            <img src="${curso.imagen}" width=100>

        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row)
    guardarCursoLocalStorage(curso)
}

// elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();
    
    let curso,
        cursoId;
    if(e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement
        cursoId = curso.querySelector('a').getAttribute('data-id')
    }
    eliminarCursoLocalStorage(cursoId);

}

// función para vaciar todo el carrito en el DOM

function vaciarCarrito() {
    // forma lenta
    // listaCursos.innerHTML = '';
    // forma rápida (recomendada)
    while(listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild)
    }

    // vaciar LocalStorage
    vaciarLocalStorage();

    return false;
}

// almacena cursos en el carrito al local storage
function guardarCursoLocalStorage(curso) {
    let cursos;

    cursos = obtenerCursosLocalStorage();

    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos))
}

// comprueba que haya elementos en Local Storage
function obtenerCursosLocalStorage() {
    let cursosLS;

    // comprobamos si hay algo en local storage
    if(localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse( localStorage.getItem('cursos') );
    }
    return cursosLS;
}

// imprime los cursos de local storage
function leerLocalStorage() {
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage()

    cursosLS.forEach( function(curso) {
        // construir el template
        const row = document.createElement('tr')
        row.innerHTML = `
            <td> 
                <img src="${curso.imagen}" width=100>
    
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
        listaCursos.appendChild(row)

    })
}

// elimina el curso por el id en Local Storage

function eliminarCursoLocalStorage(curso) {
    let cursosLS;
    // obtenemos el arreglo de cursos
    cursosLS = obtenerCursosLocalStorage()
    // iteramos comparando el id del curso borrado con los del local storage
    cursosLS.forEach(function(cursoLS, index) {
        if(cursoLS.id === curso) {
            cursosLS.splice(index, 1)
        }
    });
    // añadimos el arreglo actual a local storage
    localStorage.setItem('cursos', JSON.stringify(cursosLS))
}

// elimina todos los cursos de local storage
function vaciarLocalStorage() {
    localStorage.clear();
}