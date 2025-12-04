// Variable global (temporal) para almacenar los clientes
// En un entorno real, estos datos vendrían de una base de datos.
const clientesData = [
    // Cliente de ejemplo inicial:
    {
        id: 1,
        nombre: 'Ricardo Montalbán',
        email: 'ricardo.montalban@mail.com',
        segmento: 'VIP',
        preferencias: 'Blackjack, Ruleta',
        telefono: '+1 (555) 123-4567',
        fechaRegistro: '2024-05-10',
        notas: 'Cliente de alto valor, prefiere atención personalizada.',
        badgeClass: 'badge-soft-purple',
        visitas: 45, // Añadido para el nuevo formato
        gastoTotal: '125.000', // Añadido para el nuevo formato
        direccion: 'Av. Principal 123, Miami, FL' // Añadido para el nuevo formato
    },
    // Añadir los clientes de las capturas para que se rendericen correctamente
    {
        id: 2,
        nombre: 'Carlos Rodríguez',
        email: 'carlos.rodriguez@email.com',
        segmento: 'Frecuente',
        preferencias: 'Slots, Blackjack',
        telefono: '+1 (555) 234-5678',
        fechaRegistro: '27/10/2025',
        notas: 'Cliente frecuente, le gusta el blackjack.',
        badgeClass: 'badge-soft-blue',
        visitas: 28,
        gastoTotal: '58.000',
        direccion: 'Calle 45 #67, Orlando, FL'
    },
    {
        id: 3,
        nombre: 'Roberto Sánchez',
        email: 'roberto.sanchez@email.com',
        segmento: 'Ocasional',
        preferencias: 'Slots, Bingo',
        telefono: '+1 (555) 678-9012',
        fechaRegistro: '14/09/2025',
        notas: 'Cliente de bajo valor, puede estar inactivo.',
        badgeClass: 'badge-soft-orange',
        visitas: 12,
        gastoTotal: '18.000',
        direccion: 'Plaza Norte 890, Naples, FL',
        inactivo: true // Bandera para simular el estado "Inactivo"
    }
];


document.addEventListener('DOMContentLoaded', function() {

    // ------------------------------------------------------------------
    // 0. Función para cargar contenido HTML externo (Para archivos separados)
    // ------------------------------------------------------------------
    const loadedSections = {};
    function loadSectionContent(sectionName) {
        const containerId = `section-${sectionName}`;
        const container = document.getElementById(containerId);
        
        // Si ya está cargado o la sección no existe, salimos
        if (loadedSections[sectionName] || !container) return; 

        const filePath = `secciones/${sectionName}.html`;
        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error('No se pudo cargar la sección');
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                loadedSections[sectionName] = true;
                
                // Si cargamos la sección de clientes, renderizamos la lista
                if (sectionName === 'clientes') {
                    // Llamamos a la función de renderizado después de cargar el HTML
                    renderizarClientes();
                    // Adjuntamos el listener al botón de guardar del modal
                    attachGuardarClienteListener(); 
                }
            })
            .catch(error => {
                console.error('Error:', error);
                container.innerHTML = `<div class="alert alert-danger">Error cargando el archivo: ${filePath}. <br> <strong>Nota:</strong> Para usar fetch() necesitas usar un "Live Server" (extensión de VS Code) o un servidor local, no puedes abrir el archivo directamente con doble clic.</div>`;
            });
    }

    // ------------------------------------------------------------------
    // 1. Lógica de Navegación por Pestañas (Tabs)
    // ------------------------------------------------------------------
    const navLinks = document.querySelectorAll('#main-tabs .nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    function switchSection(targetSectionId) {
        // Oculta todas las secciones de contenido
        contentSections.forEach(section => {
            section.classList.add('hidden');
        });

        // Muestra la sección de contenido deseada
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // 1. DESACTIVAR TODOS los enlaces
            navLinks.forEach(nav => {
                nav.classList.remove('active');
                nav.classList.add('text-muted');
            });

            // 2. ACTIVAR el enlace clickeado (this)
            const sectionName = this.getAttribute('data-section');
            this.classList.add('active');
            this.classList.remove('text-muted');

            const targetSectionId = `section-${sectionName}`;
            
            // 3. Cargar contenido externo si es necesario
            if (sectionName === 'clientes' || sectionName === 'segmentacion') {
                loadSectionContent(sectionName); 
            }
            
            // 4. Mostrar la sección
            switchSection(targetSectionId);
        });
    });


    // ------------------------------------------------------------------
    // 1.b. Inicialización (Estado por defecto) - CORRECCIÓN CLAVE
    // ------------------------------------------------------------------
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.classList.add('text-muted');
    });
    
    contentSections.forEach(section => {
        section.classList.add('hidden');
    });

    const dashboardTab = document.querySelector('[data-section="dashboard"]');
    if (dashboardTab) {
        dashboardTab.classList.remove('text-muted');
        dashboardTab.classList.add('active');
    }
    const dashboardContent = document.querySelector('#section-dashboard');
    if (dashboardContent) {
        dashboardContent.classList.remove('hidden');
    }

    // ------------------------------------------------------------------
    // 2. Inicialización de Gráficos (Chart.js)
    // ------------------------------------------------------------------
    initCharts(); 

    function initCharts() {
        // ... (Tu código de Chart.js intacto) ...
        // --- GRÁFICO DE LÍNEA: Clientes y Visitas ---
        const ctxLine = document.getElementById('lineChartClientes');
        if (ctxLine) {
            new Chart(ctxLine, {
                type: 'line',
                data: {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                    datasets: [
                        {
                            label: 'Clientes',
                            data: [950, 960, 1000, 1100, 1300, 1520],
                            borderColor: '#007bff', 
                            backgroundColor: 'transparent',
                            tension: 0.4,
                            pointRadius: 5,
                            pointHoverRadius: 8,
                            pointBackgroundColor: '#007bff',
                            borderWidth: 2,
                        },
                        {
                            label: 'Visitas',
                            data: [1900, 2100, 2400, 2850, 3400, 3800],
                            borderColor: '#6f42c1', 
                            backgroundColor: 'transparent',
                            tension: 0.4,
                            pointRadius: 5,
                            pointHoverRadius: 8,
                            pointBackgroundColor: '#6f42c1',
                            borderWidth: 2,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                font: { size: 12 }
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        }
                    },
                    scales: {
                        x: { grid: { display: false } },
                        y: {
                            beginAtZero: true,
                            min: 0,
                            max: 3800, 
                            ticks: {
                                stepSize: 950, 
                                callback: function(value) {
                                    if (value % 950 === 0 && value <= 3800) {
                                        return value;
                                    }
                                    return null;
                                }
                            }
                        }
                    }
                }
            });
        }

        // --- GRÁFICO DE PASTEL: Segmentación de Clientes ---
        const ctxPie = document.getElementById('pieChartSegmentacion');
        if (ctxPie) {
            new Chart(ctxPie, {
                type: 'doughnut', 
                data: {
                    labels: ['Ocasionales', 'Frecuentes', 'VIP', 'Nuevos'],
                    datasets: [{
                        data: [34, 30, 19, 17], 
                        backgroundColor: [
                            '#28a745', 
                            '#007bff', 
                            '#6f42c1', 
                            '#fd7e14'
                        ],
                        hoverOffset: 10
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right', 
                            labels: {
                                generateLabels: function(chart) {
                                    const data = chart.data;
                                    if (data.labels.length && data.datasets.length) {
                                        return data.labels.map((label, i) => {
                                            const value = data.datasets[0].data[i];
                                            return {
                                                text: `${label} (${value}%)`, 
                                                fillStyle: data.datasets[0].backgroundColor[i],
                                                strokeStyle: '#fff',
                                                lineWidth: 1,
                                                hidden: isNaN(value),
                                                index: i
                                            };
                                        });
                                    }
                                    return [];
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    
    
    // ==================================================================
    // 3. Lógica de Clientes (Añadir y Mostrar)
    // ==================================================================

    // Función para adjuntar el listener al botón 'Guardar Cliente'
    function attachGuardarClienteListener() {
        // Nota: El botón 'Guardar Cliente' debe estar dentro de la sección cargada
        // Por lo general, está en el modal, que puede estar en index.html o en secciones/clientes.html
        const btnGuardarCliente = document.querySelector('#modalNuevoCliente .btn-dark');

        if (btnGuardarCliente) {
            // Primero, removemos cualquier listener previo para evitar duplicados
            btnGuardarCliente.removeEventListener('click', guardarNuevoCliente);
            // Luego, adjuntamos el nuevo listener
            btnGuardarCliente.addEventListener('click', guardarNuevoCliente);
        }
    }


    // Función principal para capturar y guardar el nuevo cliente
    function guardarNuevoCliente(e) {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario/botón si lo hay

        // 1. CAPTURA DE DATOS
        const form = document.getElementById('formNuevoCliente'); // Asumiendo que el formulario tiene este ID
        
        // Si el formulario no existe o no se cargó correctamente, salimos
        if (!form) {
            console.error("No se encontró el formulario de nuevo cliente.");
            return;
        }

        // Crear objeto cliente
        const nuevoCliente = {
            id: clientesData.length + 1, // Asignar un nuevo ID incremental
            nombre: form.querySelector('[name="nombre"]').value,
            email: form.querySelector('[name="email"]').value,
            telefono: form.querySelector('[name="telefono"]').value,
            segmento: form.querySelector('[name="segmento"]').value,
            direccion: form.querySelector('[name="direccion"]').value,
            preferencias: form.querySelector('[name="preferencias"]').value,
            notas: form.querySelector('[name="notas"]').value,
            fechaRegistro: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }), // Formato DD/MM/YYYY
            badgeClass: getBadgeClass(form.querySelector('[name="segmento"]').value), // Asignar clase de estilo
            // Datos adicionales para que coincidan con el formato de las tarjetas
            visitas: 1, // Es un cliente nuevo
            gastoTotal: '0.00',
        };
        
        // 2. VALIDACIÓN BÁSICA
        if (!nuevoCliente.nombre || !nuevoCliente.email) {
            alert("El Nombre y el Email son campos obligatorios.");
            return;
        }

        // 3. AGREGAR A LA LISTA TEMPORAL
        clientesData.push(nuevoCliente);
        
        console.log(`Cliente ${nuevoCliente.nombre} agregado. Total de clientes: ${clientesData.length}`);

        // 4. LIMPIAR Y CERRAR EL MODAL (Usando la API de Bootstrap)
        const modalElement = document.getElementById('modalNuevoCliente');
        // Limpiar el formulario
        form.reset();
        
        // Obtener la instancia de Bootstrap del modal y ocultarlo
        // Asegúrate de que tienes Bootstrap JS cargado para que esto funcione
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        } else {
            // Si no se encuentra la instancia (ej. si el modal no se cargó con JS), forzamos el cierre
            modalElement.classList.remove('show');
            modalElement.style.display = 'none';
        }
        
        // 5. ACTUALIZAR LA INTERFAZ DE CLIENTES
        renderizarClientes();
    }
    
    // Función de utilidad para asignar el estilo del badge
    function getBadgeClass(segmento) {
        switch (segmento) {
            case 'VIP': return 'badge-soft-purple';
            case 'Frecuente': return 'badge-soft-blue';
            case 'Nuevo': return 'badge-soft-green'; 
            case 'Ocasional': return 'badge-soft-orange';
            default: return 'badge-soft-blue'; // Por defecto
        }
    }


    // *** LA FUNCIÓN MODIFICADA PARA COINCIDIR CON TUS CAPTURAS ***
    // Ahora genera la fila horizontal en lugar de la tarjeta vertical
    function createClientCardHTML(cliente) {
        const segmentBadgeClass = cliente.badgeClass || getBadgeClass(cliente.segmento);
        const segmentBadge = `<span class="badge ${segmentBadgeClass}">${cliente.segmento}</span>`;
        const direccionDisplay = cliente.direccion ? `<i class="bi bi-geo-alt-fill me-2"></i> ${cliente.direccion}` : '';
        
        // Usamos la bandera 'inactivo' si existe, o si es un cliente ocasional y lleva mucho tiempo.
        // Aquí solo usamos la bandera que definimos en clientesData para Roberto Sánchez.
        const inactivoBadge = cliente.inactivo ? '<span class="badge bg-secondary ms-2">Inactivo</span>' : '';

        return `
            <div class="card client-row-card mb-3 p-3">
                <div class="row align-items-center">
                    
                    <div class="col-12 col-md-4">
                        <h5 class="card-title text-dark fw-bold mb-1 d-flex align-items-center">
                            ${cliente.nombre} <span class="ms-2">${segmentBadge}</span> ${inactivoBadge}
                        </h5>
                        <p class="text-muted small mb-0">
                            <i class="bi bi-envelope-fill me-2"></i> ${cliente.email} | 
                            <i class="bi bi-telephone-fill me-2"></i> ${cliente.telefono}
                        </p>
                        <p class="text-muted small mb-0">
                            ${direccionDisplay}
                        </p>
                    </div>

                    <div class="col-12 col-md-6 text-md-start mt-2 mt-md-0">
                        <div class="row">
                            <div class="col-4">
                                <p class="text-muted small mb-0">Visitas</p>
                                <p class="fw-bold">${cliente.visitas}</p>
                            </div>
                            <div class="col-4">
                                <p class="text-muted small mb-0">Última Visita</p>
                                <p class="fw-bold">${cliente.fechaRegistro}</p>
                                <p class="text-muted small mb-0">Prefiere: ${cliente.preferencias || 'N/A'}</p>
                            </div>
                            <div class="col-4">
                                <p class="text-muted small mb-0">Gasto Total</p>
                                <p class="fw-bold text-success">${cliente.gastoTotal}</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-2 text-md-end mt-2 mt-md-0">
                        <button class="btn btn-outline-secondary btn-sm w-100">Ver Perfil</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Función para inyectar los clientes en el contenedor
    function renderizarClientes() {
        const contenedor = document.getElementById('clientes-grid'); 
        
        // ¡IMPORTANTE! Asegúrate de que el contenedor en tu HTML (secciones/clientes.html) 
        // donde deben ir las filas tenga el ID="clientes-grid"

        if (!contenedor) return; 

        let htmlContent = '';
        clientesData.forEach(cliente => {
            htmlContent += createClientCardHTML(cliente);
        });
        
        // Si no hay clientes, mostramos un mensaje
        if (clientesData.length === 0) {
            htmlContent = '<div class="col-12"><p class="text-center text-muted mt-5">No hay clientes registrados.</p></div>';
        }

        contenedor.innerHTML = htmlContent;
    }

    // FIN DEL DOMContentLoaded
});

