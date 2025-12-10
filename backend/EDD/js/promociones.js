document.querySelector('[data-section="promociones"]').addEventListener('click', () => {
    
    fetch('secciones/promociones.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('section-promociones').innerHTML = html;

            // Mostrar la sección y ocultar las demás
            document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('hidden'));
            document.getElementById('section-promociones').classList.remove('hidden');
        })
        .catch(err => console.error('Error cargando promociones:', err));
});
