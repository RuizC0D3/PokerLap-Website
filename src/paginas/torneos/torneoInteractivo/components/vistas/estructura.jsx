"use client";

import { HeaderEstructura } from "../../modelos/opciones";


const Estructura = (props) => {
  const { torneoData = { Estructura: [] } } = props
  const reduceFichas = (fichas) => {
    let lasFichas = parseFloat(fichas)
    if (lasFichas >= 1000000) {
      lasFichas = parseFloat((lasFichas / 1000000).toFixed(2));
      return lasFichas + 'M';
    } else if (lasFichas >= 1000) {
      lasFichas = parseFloat((lasFichas / 1000).toFixed(2))
      return lasFichas + 'K';
    } else {
      return lasFichas;
    }

  }
  return (
    <div className="tableinter">
      <table className="">
        <thead>
          <tr>
            {HeaderEstructura.map((key, i) => {
              return (
                <>
                  <th>
                    {key.string}
                  </th>
                </>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {torneoData.Estructura.map((key, i) => {
            return (
              <>
                <tr className={key.n === '-' ? 'bgcolor-poker' : ''}>
                  {HeaderEstructura.map((keyh, i) => {
                    return (
                      <>
                        <td className={keyh.key === 'n' ? key[keyh.key] === '-' ? 'bgcolor-poker' : '' : ''}>
                          {keyh.key === 'n' ? key[keyh.key] === '-' ? 'Descanso' : key[keyh.key] : reduceFichas(key[keyh.key])}
                        </td>
                      </>
                    );
                  })}
                </tr>
              </>
            );
          })}

        </tbody>
      </table>
    </div>
  );
};
export default Estructura;
