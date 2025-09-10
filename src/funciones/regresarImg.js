

const ResgresarImagenCorrecta = async (imag, numero) => {
    let resss = false
    let imagen = new Image()
    imagen.src = imag
    imagen.onload = () => {
        console.log(imagen.naturalHeight);
        if (imagen.naturalHeight > 0) {
            resss = true
        } else {
            resss = false

        }
    }
    imagen.onerror = () => {
        resss = false
    }
    return resss
}
export default ResgresarImagenCorrecta
