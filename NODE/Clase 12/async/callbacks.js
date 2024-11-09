function hola(nombre, miCallback) {
    setTimeout(function () {
        console.log('Hola, ' + nombre);
        miCallback(nombre);
    }, 1000)
}

function adios(nombre, otroCallback) {
    setTimeout(function () {
        console.log('Adios, ' + nombre);
        otroCallback();
    }, 1000)

}

console.log('Iniciando proceso...');
hola('Lucas', function (nombre) {
    adios('Lucas', function () {
        console.log('Terminando proceso...');
    })
});

// hola('Carlos', Function(),{});
// adios('Carlos', Function(),{});