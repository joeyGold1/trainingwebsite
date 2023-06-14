
let showTedCount = 0;
function onPointerMove() {
    const overlay = document.getElementsByClassName('overlay')[0]
    if (showTedCount % 200 > 190 ) {
        overlay.classList.remove('hide');
    } else {
        overlay.classList.add('hide');
    }
    showTedCount++;
}
document.addEventListener('pointermove', onPointerMove);

