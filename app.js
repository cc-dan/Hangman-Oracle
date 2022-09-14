pantallas = ['menu-principal', 'juego', 'agregar-palabra'];
pantalla_actual = 'menu-principal';
canvas = document.getElementById('horca');
canvas_2d = canvas.getContext('2d');
stickman_x = canvas.width/2;
stickman_y = 72;
nivel = 0;
palabra = "naranja";
adivinadas = [];
equivocadas = [];
permitidas = 'qwertyuiopasdfghjklñzxcvbnm';
termino = false;

document.onkeypress = function(k) {
    if (pantalla_actual == 'juego' && !termino) {
        if (palabra.includes(k.key)) {
            adivinadas.push(k.key);
            document.getElementById('palabra').innerHTML = palabra.split('').map(function(letra) { 
                if (adivinadas.includes(letra)) { return letra } else { return '_' } }).join(' ');
        
            if (adivinadas.length == palabra.length) { termino = true; }
        } else {
            if (!(equivocadas.includes(k.key)) && permitidas.includes(k.key)) {
                equivocadas.push(k.key);
                document.getElementById('equivocadas').innerHTML = equivocadas.join(' ');
                dibujar();
            }
        }
        console.log(adivinadas);
    }
}

function cambiar(pantalla) {
    for (x = 0; x < pantallas.length; x++) {
        if (pantallas[x] != pantalla) {
            document.getElementById(pantallas[x]).style = 'display: none';
        } else {
            document.getElementById(pantallas[x]).style = 'display: flex';
        }
    }

    if (pantalla == 'juego') {
        dibujar();
    } else {
        resetear();
    }

    pantalla_actual = pantalla;
}

function horca(x, y) {
    canvas_2d.moveTo(x+70, canvas.height-4+y);
    canvas_2d.lineTo(x+200, canvas.height-4+y);
    canvas_2d.moveTo(x+100, canvas.height-4+y);
    canvas_2d.lineTo(x+100, 20+y);
    canvas_2d.lineTo(x+200, 20+y);
    canvas_2d.lineTo(x+200, 40+y);
}

function dibujar() {
    canvas_2d.lineCap = "round";
    canvas_2d.lineJoin = "round";

    canvas_2d.beginPath();

    if (!(nivel > 0)) {
        horca(stickman_x - 200, 0);
        document.getElementById('palabra').innerHTML = palabra.split('').map(letra => '_').join(' ');
        document.getElementById('equivocadas').innerHTML = "";
    } else {
        canvas_2d.moveTo(stickman_x, stickman_y);

        switch(nivel) {
            case 1:
                canvas_2d.arc(stickman_x, stickman_y, 32, 0, 2 * Math.PI);
            break;

            case 2:
                canvas_2d.moveTo(stickman_x, stickman_y+32);
                canvas_2d.lineTo(stickman_x, stickman_y+140);
            break;

            case 3:
                canvas_2d.moveTo(stickman_x, stickman_y + 32);
                canvas_2d.lineTo(stickman_x-16, stickman_y + 128);    
            break;

            case 4:
                canvas_2d.moveTo(stickman_x, stickman_y + 32);
                canvas_2d.lineTo(stickman_x+16, stickman_y + 128);   
            break;

            case 5:
                canvas_2d.moveTo(stickman_x, stickman_y + 140);
                canvas_2d.lineTo(stickman_x-16, stickman_y + 220);   
            break;

            case 6:
                canvas_2d.moveTo(stickman_x, stickman_y + 140);
                canvas_2d.lineTo(stickman_x+16, stickman_y + 220);   
                termino = true;
            break;
        }
    }

    canvas_2d.stroke();
    nivel++;
}

function resetear() {
    canvas_2d.clearRect(0, 0, canvas.width, canvas.height);
    nivel = 0;
    adivinadas = [];
    equivocadas = [];
    termino = false;
    dibujar();
}