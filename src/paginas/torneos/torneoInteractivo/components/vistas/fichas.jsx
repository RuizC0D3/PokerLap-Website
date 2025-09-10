"use client";

const Fichas = (props) => {
  const { torneoData = { ColorFicha: [] }, elTorneo = 0 } = props
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
    <>
      {torneoData.ColorFicha.map((key, i) => {
        return (
          <>
            <div
              className={'flex-row align-center ficha-color wtdPxDecena-40 size-100 just-arroundCont'}
              key={`fichasc${i}`}
            >
              <span className={'flex-row align-center wtdPxDecena-15ss just-arroundCont'}>
                <span style={{ fontSize: 30,marginLeft:10 }}
                >
                  {key.v ? reduceFichas(key.v ): '0'}

                </span>
                <span style={{ color: key.c, fontSize: 50 }} className="rocasF">
                  {/*                 {key.c ? key.c : '0'}
 */}               A
                </span>
              </span>
              <span  style={{marginRight:10 }}>
               Se reduce al nivel {key.n ? key.n : '0'}
              </span>
            </div>
          </>
        );
      })}
    </>
  );
};
export default Fichas;