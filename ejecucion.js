var jugadores=["NEGRAS","BLANCAS"];

var jugador;
var oponente;

var heuristica = [[120,-20,20,5,5,20,-20,120],
[-20,-40,-5,-5,-5,-5,-40,-20],
[20,-5,15,3,3,15,-5,20],
[5,-5,3,3,3,3,-5,5],
[5,-5,3,3,3,3,-5,5],
[20,-5,15,3,3,15,-5,20],
[-20,-40,-5,-5,-5,-5,-40,-20],
[120,-20,20,5,5,20,-20,120]];


function Max(estado, turno, xAnt, yAnt, probabilidad){
    var MejorVal = -10000;

    if(turno == 1){
        otroTurno = 0
    }
    else{
        otroTurno = 1
    }

    if (probabilidad <= 0){
        return heuristica[xAnt][yAnt];
    }
    else {
        var posiblesMovimientos = getMovimientosValidos(estado, turno);
        posiblesMovimientos = posiblesMovimientos.sort(() => Math.random() - 0.5);

        for (let [d1, d2] of posiblesMovimientos) {
            var copiaEstado = obtenerVlaEstado(estado);
            hacerMovimiento(copiaEstado, turno, d1, d2);
            var valor = Min(copiaEstado, otroTurno, d1, d2, probabilidad-1);
            if(valor > MejorVal){
                MejorVal = valor
            }
        }
        return MejorVal;
    }
}

function Min(estado, turno, xAnt, yAnt, probabilidad){
    var peor = 100000;

    var otroTurno=0;
    if(turno == 1){
        otroTurno = 0;
    }
    else{
        otroTurno = 1;
    }

    if (probabilidad <= 0){
        return heuristica[xAnt][yAnt];
    }
    else{
        var posiblesMovimientos = getMovimientosValidos(estado, turno);
        posiblesMovimientos = posiblesMovimientos.sort(() => Math.random() - 0.5);

        for (let [d1, d2] of posiblesMovimientos) {
            var copiaEstado = obtenerVlaEstado(estado);
            hacerMovimiento(copiaEstado, turno, d1, d2);
            var valor = Max(copiaEstado, otroTurno, d1, d2, probabilidad-1);
            if(valor < peor){
                peor = valor;
            }
        }
        return peor
    }
}

function getMovMinMax(estado, turno){

    var otroNuevoTurno=0;
    var posiblesMovimientos = getMovValido(estado, turno);
    posiblesMovimientos = posiblesMovimientos.sort(() => Math.random() - 0.5);

    for (let [d1, d2] of posiblesMovimientos) {
        if (esquina(d1,d2)){
        return String(d2)+""+String(d1)
        }
    }
            
    if(turno == 1){
        otroNuevoTurno = 0;
    }
    else{
        otroNuevoTurno = 1;
    }

    var mejorValor = -99999;
    var mejorValor2 = -1;
    var mejorMovimiento = -1;

    for (let [d1, d2] of posiblesMovimientos) {
        var copiaEstado = getCopiaEstado(estado);
        crearMov(copiaEstado, turno, x, y);
        var valor = minimo(copiaEstado, otroNuevoTurno, x, y, 3);
        var valor2 = getValorEstado(estado, turno);
        if((valor > mejorValor) || (valor == mejorValor && valor2 > mejorValor2)){
            mejorMovimiento = String(y)+""+String(x);
            mejorValor = valor;
            mejorValor2 = valor2;
        }
    }

    return mejorMovimiento;
}

function getMovimiento(estado, turno) {

    var posiblesMovimientos = getMovimientosValidos(estado, turno);
    posiblesMovimientos = posiblesMovimientos.sort(() => Math.random() - 0.5);

    for (let [d1, d2] of posiblesMovimientos) {
        if (corner(d1, d2)){
            return (String(d2) + "" + String(d1));
        }
    }

    var MejorVal = -10000
    var Mejor = -1

    for (let [d1, d2] of posiblesMovimientos) {
        var copiaEstado = obtenerVlaEstado(estado);
        hacerMovimiento(copiaEstado, turno, d1, d2);
        var valor = heuristica[d1][d2];
        if(valor > MejorVal){
            Mejor = String(d2)+""+String(d1);
            MejorVal = valor;
        }
    }
        
    return Mejor;
}

function corner(x, y) {
    return (x == 0 && y == 0) || (x == 7 && y == 0) || (x == 0 && y == 7) || (x == 7 && y == 7);
}

function hacerMovimiento(estado, turno, xMov, yMov) {
    var movimientoCambiar = movValidos(estado, turno, xMov, yMov);

    if (movimientoCambiar == false) {
        return false;
    }
    estado[xMov][yMov] = turno;
    for (let [d1, d2] of movimientoCambiar) {
        estado[d1][d2] = turno;
    }
    return true;
}


function obtenerVlaEstado(estado) {
    var copiaEstado = getNuevoEstado();

    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
            copiaEstado[x][y] = estado[x][y];
        }
    }
    return copiaEstado;
}


function getValEstado(estado, turno) {
    var valor = 0;

    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
            if (estado[x][y] == turno) {
                valor += 1;
            }
        }
    }
    return valor;
}

function getMovimientosValidos(estado, turno) {
    var movimientos = [];

    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
            if (movValidos(estado, turno, x, y) != false) {
                movimientos.push([x, y]);
            }
        }
    }
    return movimientos;

}


function movValidos(estado, turno, xMov, yMov) {
    var otroTurno=0;
    if (estado[xMov][yMov] != 2 || !estaEnTablero(xMov, yMov)) {
        return false;
    }

    estado[xMov][yMov] = turno;

    if (turno == 1) {
        otroTurno = 0;
    }
    else {
        otroTurno = 1;
    }

    var movimientoCambiar = []

    var nuevin = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

    for (var iti = 0; iti < 8; iti++) {
        var xdir = nuevin[iti][0];
        var ydir = nuevin[iti][1];
        var x = xMov;
        var y = yMov;

        x += xdir;
        y += ydir;

        if (estaEnTablero(x, y) && (estado[x][y] == otroTurno)) {
            x += xdir;
            y += ydir;

            if (!estaEnTablero(x, y)) {
                continue;
            }
            while (estado[x][y] == otroTurno) {
                x += xdir;
                y += ydir;
                if (!estaEnTablero(x, y)) {
                    break;
                }


            }
            if (!estaEnTablero(x, y)) {
                continue;
            }
            if (estado[x][y] == turno) {
                while (true) {
                    x -= xdir;
                    y -= ydir;
                    if ((x == xMov) && (y == yMov)) {
                        break;
                    }
                    movimientoCambiar.push([x, y]);
                }
            }

        }

    }
    estado[xMov][yMov] = 2;
    if (movimientoCambiar.length == 0) {
        return false
    }
    return movimientoCambiar;
}

function estaEnTablero(x, y) {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7
}

function getEstado(estado) {
    var aarray = [];
    for (var i = 0; i < estado.length; i++) {
        aarray.push(Number(estado.charAt(i)));
    }
    var nuevoestado = [];
    nuevoestado = getNuevoEstado();
    var x = 0;
    var y = 0;
    for (var j in aarray) {
        nuevoestado[x][y] = aarray[j];
        x += 1;
        if (x == 8) {
            x = 0;
            y += 1;
        }
    }
    return nuevoestado;
}


exports.principal = function inicio(estado, turno){
            var destado = getEstado(estado)
            var respuesta = obtenerMov(destado, turno)           
            return respuesta
}