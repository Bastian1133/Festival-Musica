document.addEventListener('DOMContentLoaded', function() {
    
    navegacionFija()
    crearGaleria()
    resaltarEnlace()
    scrollNav()
})

function navegacionFija(){
    const header = document.querySelector('.header')
    const sobreFestival = document.querySelector('.sobre-festival')

    window.addEventListener('scroll', function() {
        if(sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
        }
    })
}

function crearGaleria(){
    const CANTIDAD_IMAGENES = 16
    const galeria = document.querySelector('.galeria-imagenes')

    for(let i = 1; i <= CANTIDAD_IMAGENES; i++){
        const imagen = document.createElement('PICTURE') //en mayusculas porque se genera con un script
        // imagen.src = `src/img/gallery/thumb/${i}.jpg` //le pasa el nombre de cada foto
        // imagen.alt = 'Imagen Galeria' //introduce el texto alternativo de la imagenal html
        // // Codigo para aplicar lazy loading a las imagenes
        // imagen.loading = 'lazy'
        // imagen.width = '300'
        // imagen.height = '200'
        imagen.innerHTML = `
            <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
        `;

        // Event Handler: Proceso de detectar y responder a una interaccion
        imagen.onclick = function(){
            mostrarImagen(i)
        }

        galeria.appendChild(imagen) //  inyecta las imagenes al html
    }
}

function mostrarImagen(i){
    const imagen = document.createElement('PICTURE')  
    // imagen.src = `src/img/gallery/full/${i}.jpg`  
    // imagen.alt = 'Imagen Galeria'
    imagen.innerHTML = `
        <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
    `;

    // Generar Modal
    const modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.onclick = cerrarModal

    // Boton cerrar modal
    const cerrarModalBtn = document.createElement('BUTTON')
    cerrarModalBtn.textContent = 'X'
    cerrarModalBtn.classList.add('btn-cerrar')
    cerrarModalBtn.onclick = cerrarModal

    modal.appendChild(imagen)
    modal.appendChild(cerrarModalBtn)

    // Agregar al html
    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)
    
}

function cerrarModal(){
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out') // se agrega la clase con la animacion
    setTimeout(() => { // retrasa la ejecucion de la funcion por medio segundo (500)
        modal?.remove() // si existe modal, se ejecuta remove()
        
        const body = document.querySelector('body')
        body.classList.remove('overflow-hidden')
    },500)
}

function resaltarEnlace() {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')
        
        let actual = ''
        sections.forEach( section => {

            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            
            if(window.scrollY >= (sectionTop - sectionHeight / 3)) { // detecta qué seccion es más visible
                actual = section.id
            }
        })

        navLinks.forEach(link => {
            link.classList.remove('active') // Para quitar el resaltado anterior
            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('active')
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a')

    navLinks.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({behavior: 'smooth'})
        })
    })
}