const calculoPesado = () => {
    let suma = 0;
    for (let i = 0; i < 5e9; i++) {
        suma += i;
    }
    console.log('Calculo terminado!');
}

module.exports = { calculoPesado}