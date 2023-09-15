
export const randonName = () => {
    const nombreArr = [];
    const letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
    const longitudLetras = 6;
    let nombre = ''

    for (let i = 0; i < 6; i++) {
        const letraAleatoria = letras.charAt(Math.floor(Math.random() * letras.length));
        nombre += letraAleatoria;

    }

    if (nombreArr.includes(nombre)) {
        const letraAleatoria = letras.charAt(Math.floor(Math.random() * letras.length));
        nombre += letraAleatoria;
    } else {
        nombreArr.push(nombre)
    }

    return nombreArr[0]
}

export const randomPhone = () => {
    const phoneArr = []
    let numero = Math.floor(Math.random() * 900000000) + 100000000; 
    let numeroTelefono = `+1${numero}`; 
   
  // Verificamos si el número ya ha sido generado previamente
  if (phoneArr.includes(numeroTelefono)) {
    // Si es un número único, lo agregamos al conjunto de números generados
    let numero = Math.floor(Math.random() * 900000000) + 100000000; 
    let numeroTelefono = `+1${numero}`; 
    return numeroTelefono;
  } else {
    phoneArr.push(numeroTelefono)
  }
  return phoneArr[0]
}