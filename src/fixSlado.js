export const SaldoFix = (saldo) => {
    let saldoN = `${saldo}`
    let splited = saldoN.split('')
    let res = ''
    let contador = 0
    for (let index = (splited.length - 1); index > -1; index--) {
        contador++
        const element = splited[index];
        if (contador === 4) {
            res = element + `,` + res
            contador = 1
        } else {
            res = element + res
        }
    }
    return res
}