//Obtiene la diferencia de años
export const calculoYears = (year) => {

    return new Date().getFullYear() - year; 

}

//Obtiene el incremento del valor del seguro según la marca del auto
export const obtenerIncremento = (marca) => {

    let incremento;

    switch(marca){

        case'asiatico':
            incremento = 1.05;
            break;
        case 'europeo':
            incremento = 1.30;
            break;
        case 'americano':
            incremento = 1.15;
            break;
        default:
        break;
    }

    return incremento;

}

//Retorna el incremento que tendrá el seguro según el plan seleccionado

export const obtenerPlan = (plan) => {
    return (plan === 'basico' ? 1.2 : 1.5);
}

//Retorna la palabra con la primera letra en mayúsculas

export const primerMayuscula = (texto) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}