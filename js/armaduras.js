// class Material{
// /**
//  *Creates an instance of Material.
//  * @param {*} nombre
//  * @param {*} pa puntos de armadura
//  * @param {number} [mPr=5] multiplicador de los puntos de resistencia
//  * @memberof Material
//  */
// constructor(nombre, pa,mPr=5){
//     this.nombre=nombre
//     this.pa=pa
//     this.mPr=mPr
//  }

// }

// IMPORTAR DESPUÉS DE INVENTARIO Y OBJETO

//ARMADURA SIMPLE para salir del paso rápido

// mangas = pj.cuerpo.darLocalizacion('Brazo D').todosNombres().concat(pj.cuerpo.darLocalizacion('Brazo I').todosNombres())
var ropa = {}


ropa['pantalones'] = ["Muslo Superior I", "Muslo Inferior I", "Rodilla I", "Pierna Inf I",
    "Muslo Superior D", "Muslo Inferior D", "Rodilla D", "Pierna Inf D",
    "Vientre", "Cadera D", "Ingle", "Cadera I"];

ropa['calzas'] = ropa['pantalón'] = ropa['pantalones'];

ropa['chaleco'] = ["Pecho", "Vientre", "Cadera D", "Cadera I"];
ropa['coleto'] = ropa['chaleco'].concat(["Hombro D", "Hombro I"])

// ropa['coleto']=["Hombro D", "Biceps D",
//                 "Hombro I", "Biceps I",
//                 "Pecho","Vientre", "Cadera D", "Cadera I"];


ropa['camisa'] = ["Hombro D", "Biceps D", "Antebrazo D", "Codo D",
    "Hombro I", "Biceps I", "Antebrazo I", "Codo I",
    "Pecho", "Vientre", "Cadera D", "Cadera I"];

ropa['gambesón'] = ropa['camisa'].concat(["Muslo Superior I", "Muslo Superior D"]);
ropa['joruca'] = ropa['gambesón'].concat(["Muslo Inferior I", "Muslo Inferior D"]);

ropa['camiseta'] = ["Hombro D", "Biceps D",
    "Hombro I", "Biceps I",
    "Pecho", "Vientre", "Cadera D", "Cadera I"];

ropa['guantes'] = ["Mano I", "Mano D"];
ropa['brazales'] = ["Antebrazo D", "Antebrazo I",]

ropa['coderas'] = ["Codo D", "Codo I"];
ropa['rodilleras'] = ["Rodilla I", "Rodilla D",]

ropa['guantes largos'] = ropa['guantes'].concat(ropa['brazales'])
ropa['zapatos'] = ["Pie I", "Pie D"];
ropa['espinilleras'] = ["Pierna Inf I", "Pierna Inf D",]
ropa['botas'] = ["Pierna Inf I", "Pie I",
    "Pierna Inf D", "Pie D"];

ropa['botas altas'] = ropa['botas'].concat(ropa['rodilleras']);




class Ropa extends Objeto {
    /**
     * Objeto vestible que puede proporcionar pa
     * @param {*} nombre 
     * @param {*} peso 
     * @param {*} valor 
     * @param {Array} localizaciones array de  localizaciones que cubre
     * @param {Number} peso numero de puntos de armadura
     */
    constructor(nombre, peso, valor, localizaciones, pa = 0) {
        super(nombre, peso, valor);
        this.localizaciones = localizaciones;
        this.pa = pa;
        if (!localizaciones) {
            this.parse(nombre);
        }
    }

    /**Rellena las localizaciones de la ropa por el nombre
     * @param {String} s un String con el nombre que incluye la capacidad
     */
    parse(s) {
        let PA = 0;
        var esRopa = false;
        s = s.toLowerCase()


        //PA
        var pb = new RegExp("(\\d+)\\s*pa", "i") // 7[]PA
        var re = /pa\s*[:|=|\s*](\d+)/i;    //pa[: ]6
        if (s.includes('cuero')) this.pa = 1; //en principio el cuero tiene 1PA
        var b = s.match(pb);
        if (!b) b = s.match(re); //si no encuntra pa detras busca delante

        if(b) this.pa=parseInt(b[1]);

        // if(esRopa) //-> tal vez si no tiene PA no hacer localizaciones??
        //TODO: localizaciones 
        for (let r in ropa) {
            // console.log(r);
            var pb = new RegExp(r + " ", "i");
            var b = s.match(pb);
            if (b) {
                console.log(b);
                // this.localizaciones=
                console.log((b[0]));
                this.localizaciones = ropa[r];
                esRopa = true;
            }
        }

        return esRopa;
    }
}

class Armadura {
    constructor(piezas) {
        this.piezas = piezas
    }

    atacar(daño, localizacion) {
        let armadura = this.daPiezas(localizacion);
        return daño - armadura;
    }

    /** Devuelve los PA que cubren esa localización
     *
     * @param {string} localizacion la localización 
     * @memberof Armadura
     */
    daPiezas(localizacion) {
        let armadura = 0;
        this.piezas.forEach(p => {
            let l = p.localizaciones.indexOf(localizacion)
            if (l > -1) { armadura += p.pa }
        });
        return armadura;
    }
}

class Pieza {
    constructor(localizaciones, pa) {
        this.localizaciones = localizaciones
        this.pa = pa
    }
}



// Clases de Armaduras compleja
//#region 
// class Material {
//     constructor(nombre, pa, peso, precio) {
//         this.nombre = nombre;
//         this.peso = peso;
//         this.precio = precio;
//         this.pa = pa;
//     }
// }

// class Calidad {
//     constructor(nombre, pa, peso, precio) {
//         this.nombre = nombre;
//         this.peso = peso;
//         this.precio = precio;
//         this.pa = pa;
//     }
// }

// class TipoArmadura {
//     constructor(
//         nombre
//         , pa
//         , precio
//         , pinicial
//         , pmul
//         , rigida
//         , metal
//     ) {
//         this.nombre = nombre
//         this.pa = pa
//         this.precio = precio
//         this.pinicial = pinicial
//         this.pmul = pmul
//         this.rigida = rigida
//         this.metal = metal

//     }
// }


// //TODO hacerla por capas?
// class Armadura {
//     constructor(piezas) {
//         this.capas = 0; //capas de armaduras, acolchada, malla, peto, etc...
//         this.piezas = piezas;
//     }
//     /**
//      * Devuelve las piezas que cubren esa localización
//      *
//      * @param {string} localizacion la localización 
//      * @memberof Armadura
//      */
//     daPiezas(localizacion) {
//         let lista = [];
//         this.piezas.forEach(p => {
//             let l = (p.daLoc(localizacion))
//             console.log(l);
//             if (l) { lista.push((l)) }
//         });

//         // en que tiene un orden mayor recibe el impacto antes
//         lista.sort(function (a, b) { return b.orden - a.orden });
//         return lista;

//     }

//     atacar(daño, tipo, localizacion) {
//         let d = daño;
//         let lista = daPiezas(localizacion);
//         if (lista.length < 1) return daño;
//         lista.forEach(l => {
//             if (d = 0) return 0;
//             d = l.atacar(d, tipo);
//         });
//         return d;
//     }
// }

// /**
//  *
//  *
//  * @class Pieza
//  */
// class Pieza {

//     constructor(localizaciones, orden = 0, material, tipo, ) {
//         this.localizaciones = [];
//         //por cada nombre de localizacion se crea una  
//         localizaciones.forEach(l => {
//             // this.localizaciones.push(new LocPieza(l, tipo.pa + material.pa, material.mPr))
//             this.localizaciones.push(new LocPieza(l, 5, 5, orden))
//         });
//     }


//     /**
//      * Devuelve la localizacion por el nombre
//      *
//      * @param {string} nombre de la localización
//      * @returns la LocPieza con esa localización
//      * @memberof Pieza
//      */
//     daLoc(nombre) {
//         let loc = false;
//         this.localizaciones.forEach(l => {
//             console.log(l.nombre + ":" + nombre);
//             if (l.nombre == nombre) loc = l;
//         });

//         return loc;
//     }

// }


// class LocPieza {
//     constructor(localizacion, pa, mPr = 5, orden = 0) {
//         this.nombre = localizacion;
//         // this.pa = pa;
//         this.pr = pa * mPr //TODO
//         //el orden de las capas (0 lo más pegado al cuerpo)
//         this.orden = orden;
//     }

//     get pa() {
//         return Math.round(this.pr / mPr); //devuelve los puntos de resistancia entre su multiplicador
//     }

//     atacar(daño, tipo) {
//         if (daño <= this.pa)
//             return 0;
//         else {
//             let d = daño - this.pa; 5
//             this.pr = this.pr - daño; //se restan PR
//             return d;
//         }
//     }

// }

//#endregion

//me jode los arrays

// Array.prototype.lado = function (lado) {
//     let copia = []
//     this.forEach(element => {
//         element += " " + lado;
//         copia.push(element)
//     });
//     return copia;
// }

function lado(array,lado) {
    let copia = []
    array.forEach(element => {
        element += " " + lado;
        copia.push(element)
    });
    return copia;
}


//Materiales
// const Hierro = new Material("Hierro", 1, 1, 0);
// const Acero = new Material("Acero", 1, 1.5, 1);
// const AcEnano = new Material("Acero Enano", 0.77, 13, 3);
// const AcElfico = new Material("Acero Élfico", 0.55, 20, 2);
// const AcLigero = new Material("Acero Ligero", 0.9, 1.5, 1);
// const AcPesado = new Material("Acero Pesado", 1.25, 1.3, 2);


// //Fluctuacion del Mithril
// const Mithril = new Material("Mithril", 0.25, 10000, 6);
// const MithrilNegro = new Material("Mithril Negro", 0.25, 30000, 7);

// //Materiales de Cuero
// const Normal = new Material("Normal", 1, 1, 0);
// const Excelente = new Material("Excelente", 1, 10, 1);
// const Unicornio = new Material("Unicornio", 1, 50000, 7);


// const Cuero = new TipoArmadura("Cuero", 1, 20, false, 1.5, 0.1, false);
// const CueroDuro = new TipoArmadura("Cuero Duro", 2, 20, true, 3, 0.2, false);
// const Cuirbouilli = new TipoArmadura("Cuirbouilli", 3, 45, true, 3, 0.2, false);
// const Bezanteada = new TipoArmadura("Bezanteada", 4, 70, false, 4.5, 0.3, false);
// const CotaAnillos = new TipoArmadura("Anillos", 5, 110, false, 6, 0.4, true);
// const Lamelar = new TipoArmadura("Lamelar", 6, 200, true, 10, 0.75, true);
// const Escamas = new TipoArmadura("Escamas", 6, 120, true, 12, 0.8, true);
// const Brigandina = new TipoArmadura("Brigandina", 7, 120, true, 13.5, 0.9, true);
// const CotaMalla = new TipoArmadura("Malla", 7, 240, false, 12, 0.8, true);
// const Coraza = new TipoArmadura("Coraza", 8, 270, true, 15, 1, true);

// partes para crear distintas armaduras
let capucha = ["Craneo", "Cuello"];
let chaleco = ["Pecho", "Abdomen"];
let manga = ["Hombro", "Codo", "Brazo Superior", "Antebrazo"];

// manga = manga.lado('I')
manga = lado(manga,'I')

let blusa = new Pieza(chaleco);


let cota = new Pieza(chaleco, 1);
let coraza = new Pieza(chaleco, 2)
let a = new Armadura([cota, blusa, coraza]);


var brazoD = []

brazoD = brazoD.concat("Hombro D")
brazoD = brazoD.concat("Biceps D")
brazoD = brazoD.concat("Antebrazo D")
brazoD = brazoD.concat("Codo D")
brazoD = brazoD.concat("Mano D")

// chaleco y dos mangas
todo = brazoD.concat(chaleco, manga, lado(brazoD,'I'))


