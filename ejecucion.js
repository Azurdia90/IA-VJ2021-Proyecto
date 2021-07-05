
/** FUNCION PARA EJEUCION DE MINIMO Y MAXIMOS **/
function inicio(s, t){
    status = s;
    var vector = []
    for (let index = 0; index < 64; index++) {
        vector.push([status[index],index]);
    }
   
    moves = getSuccessorMoves(t,vector);
    return selectBetterMove(moves[0]);
}

/** FUNCION PARA OBTENER LA POSICION DE LA COLUMNA Y FILA EN LA QUE SE INSERTARA LA FICHA **/
function indiceColumna(indice){
    col = Math.trunc(indice/8);
    fil = (indice%8);
    console.log("columna: "+col+" ,fila:"+fil);
    _return = ""+col+""+fil;
    return _return;
}

/** SELECCIONAR MEJOR MOTIVIMIENTO **/
function selectBetterMove(moves){
    var better=[];
    var indice = 0;

    for (let index = 0; index < moves.length; index++) {

      if (moves[index].length > better.length){
          better = moves[index].length;
          indice = index;
      }
    }

    //console.log("indice: "+indice);

    col = Math.trunc(indice/8);
    fil = (indice%8);
    console.log("f,c"+fil+","+col);

    res = ""+col+""+fil;
    //return res;
    return indice;
}

function getSuccessorMoves(t, vector){
    var movimientos =[];
    var moves =[];
    for (let index = 0; index < 64; index++) {
       moves[index] = [];        
    }
    //console.log(moves);
    //VERTICALES Y HORIZONTALES
    for (var x = 0; x < 8; x++) {
        v = getVertical(x,vector);
        h = getHorizontal(x,vector);
        var mv= getMoves(v,t);
        var mh= getMoves(h,t);
        movimientos = movimientos.concat(mv);
        movimientos = movimientos.concat(mh);

    }
    //DIAGONALES
    for(let y=0; y<6; y++){
        var asc = 56+y; 
        var desc = y;
        da1 = getDiagonal(asc,vector,true);
        dd1 = getDiagonal(desc,vector,false);
        movimientos = movimientos.concat(getMoves(da1,t));
        movimientos = movimientos.concat(getMoves(dd1,t));
     
    }
    for(let y=2; y<7; y++){
        var asc = y; 
        var desc =(7-y)*8;
        da2 = getDiagonal(asc,vector,true);
        dd2 = getDiagonal(desc,vector,false);
        movimientos = movimientos.concat(getMoves(da2,t));
        movimientos = movimientos.concat(getMoves(dd2,t));
    }

    
   for (let index = 0; index < movimientos.length; index++) {
       mov = movimientos[index];
       moves[mov[0]]= moves[mov[0]].concat(mov[1]);
   }

   var movimientos_no_rep=[];
   for (let index = 0; index < moves.length; index++) {
    if (moves[index].length!=0){
        movimientos_no_rep.push([index,moves[index]]);
    }
   }

   return [moves,movimientos_no_rep];
}

function getVertical(i,vector){
    resultado = [];
    for (let index = i; index < 64; index+=8) {
       resultado.push(vector[index])
    }
    return resultado;
}

function getHorizontal(j,vector){
    resultado = [];
    for (let index = 0; index <8; index++) {
       resultado.push(vector[j*8+index])
    }
    return resultado;
}

function getDiagonal(k,vector,asc){
   
    if (asc){
        ls=64;
        factor = -7;
        if(k>=56){
            li= 8*k-442;
        }else{

            li = 5/8-1;
        }
    }
    else {
        factor=9;
        li=-1;
        if(k<7){
            ls= 7*(9-k)+1;
        }else{
            ls= 63-(k/8)+1;
        }
    }
    resultado = [];
    for (let index = k; index >li && index <ls; index+=factor) {
        resultado.push(vector[index]);
    }

     return resultado;
}


function getMoves(vector, turno){
    propia = false;
    vacia = false;
    var temp;
    var move_p = [];
    var list_p = [];
    var move_v =[];
    var list_v =[];
    var res=[];
    for (let pos = 0; pos < vector.length; pos++) {

       if (vector[pos][0] == 2){  //ENCONTRANDO UNA VACÍA

            vacia = true;
            temp = vector[pos][1];
            if (propia && list_p.length!=0){
                var new_move = [temp,[...list_p]]
                move_p.push(new_move);
                list_p = [];
            }
            if(vacia){
                list_v=[];
            }
            propia = false; 
        }
       else if (vector[pos][0] == turno){ // ENCONTRAR FICHAS PROPIAS
           propia = true
           if(vacia && list_v.length !=0){
                var new_move = [temp,[...list_v]]
                move_v.push(new_move);
                list_v = [];
           }
           if(propia){
               list_p=[];
           }
           vacia = false;
        }
        else{                       //ENCONTRANDO AL ENEMIGO

            if(propia){
                list_p.push(vector[pos][1]);
            }
            if(vacia){
                list_v.push(vector[pos][1]);
            }
        }
    }

    res = move_p.concat(move_v);
    return res;

}

exports.inicio = inicio;
exports.indiceColumna = indiceColumna;