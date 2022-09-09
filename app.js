pantallas = ['menu-principal', 'juego', 'agregar-palabra'];
canvas = document.querySelector('canvas');
canvas_2d = canvas.getContext('2d');
stickman_x = 204;
stickman_y = 72;
nivel = 0;

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
    }
}

function horca(x, y) {
    canvas_2d.moveTo(x+0, canvas.height-4+y);
    canvas_2d.lineTo(x+200, canvas.height-4+y);
    canvas_2d.moveTo(x+100, canvas.height-4+y);
    canvas_2d.lineTo(x+100, 20+y);
    canvas_2d.lineTo(x+200, 20+y);
    canvas_2d.lineTo(x+200, 40+y);
}

function dibujar() {
    canvas_2d.beginPath();
    
    if (!(nivel > 0)) {
        horca(4, 0);
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
            break;
        }
    }

    canvas_2d.stroke();
    nivel++;
}

function resetear() {
    canvas_2d.clearRect(0, 0, canvas.width, canvas.height);
    nivel = 0;
    dibujar();
}