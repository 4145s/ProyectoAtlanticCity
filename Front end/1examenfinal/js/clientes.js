document.addEventListener('DOMContentLoaded', (event) => {
    
    // --- REFERENCIAS DOM ---
    const clientesGrid = document.getElementById('clientes-grid'); 
    const clientesNuevosContainer = document.getElementById('clientes-nuevos'); 
    const formNuevoCliente = document.getElementById('formNuevoCliente');
    const btnGuardarCliente = document.getElementById('btnGuardarCliente');
    const modalNuevoClienteEl = document.getElementById('modalNuevoCliente');
    const modalVerPerfilEl = document.getElementById('modalVerPerfil');

    // --- INSTANCIAS DE MODALES BOOTSTRAP ---
    // Usamos el operador ternario (? :) para evitar errores si el modal no existe en el HTML
    const modalNuevoCliente = modalNuevoClienteEl ? new bootstrap.Modal(modalNuevoClienteEl) : null;
    const modalVerPerfilInstance = modalVerPerfilEl ? new bootstrap.Modal(modalVerPerfilEl) : null;

    // --- DATOS DE EJEMPLO (SEED DATA) ---
    // Estos datos se usarán si el localStorage está vacío
    const datosIniciales = [
        {
            id: 1,
            nombre: 'Ricardo Montalbán',
            email: 'ricardo.montalban@mail.com',
            segmento: 'VIP',
            preferencias: 'Blackjack, Ruleta',
            telefono: '+1 (555) 123-4567',
            fechaRegistro: '2024-05-10',
            notas: 'Cliente de alto valor, prefiere atención personalizada.',
            visitas: 45,
            gastoTotal: '125.000',
            direccion: 'Av. Principal 123, Miami, FL'
        },
        {
            id: 2,
            nombre: 'Carlos Rodríguez',
            email: 'carlos.rodriguez@email.com',
            segmento: 'Frecuente',
            preferencias: 'Slots, Blackjack',
            telefono: '+1 (555) 234-5678',
            fechaRegistro: '27/10/2025',
            notas: 'Cliente frecuente, le gusta el blackjack.',
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
            notas: 'Cliente de bajo valor.',
            visitas: 12,
            gastoTotal: '18.000',
            direccion: 'Plaza Norte 890, Naples, FL'
        }
    ];

    // --- 1. CARGA DE CLIENTES (Lógica Inteligente) ---
    // Intenta leer localStorage. Si no hay nada, usa datosIniciales y los guarda.
    let clientes = JSON.parse(localStorage.getItem("clientes"));
    
    if (!clientes || clientes.length === 0) {
        clientes = datosIniciales;
        localStorage.setItem("clientes", JSON.stringify(clientes));
    }

    // --- 2. FUNCIÓN PARA GENERAR HTML (Tarjeta Horizontal) ---
    function generarTarjetaCliente(cliente) {
        let badgeClass = '';
        switch (cliente.segmento) {
            case 'VIP': badgeClass = 'badge-soft-purple'; break;
            case 'Frecuente': badgeClass = 'badge-soft-blue'; break;
            case 'Ocasional': badgeClass = 'badge-soft-green'; break;
            case 'Nuevo': default: badgeClass = 'bg-primary text-white'; break; 
        }

        // Definir badges adicionales (ej: inactivo) si existen
        const inactivoBadge = cliente.inactivo ? '<span class="badge bg-secondary ms-2">Inactivo</span>' : '';

        return `
            <div class="col-12 animate__animated animate__fadeIn">
                <div class="card client-row-card mb-3 p-3">
                    <div class="row align-items-center">
                        
                        <div class="col-12 col-md-4">
                            <h5 class="card-title text-dark fw-bold mb-1 d-flex align-items-center">
                                ${cliente.nombre} <span class="badge ${badgeClass} ms-2">${cliente.segmento}</span> ${inactivoBadge}
                            </h5>
                            <p class="text-muted small mb-0">
                                <i class="bi bi-envelope-fill me-2"></i> ${cliente.email}
                            </p>
                            <p class="text-muted small mb-0">
                                <i class="bi bi-geo-alt-fill me-2"></i> ${cliente.direccion || 'Sin dirección'}
                            </p>
                        </div>

                        <div class="col-12 col-md-6 text-md-start mt-2 mt-md-0">
                            <div class="row">
                                <div class="col-4">
                                    <p class="text-muted small mb-0">Visitas</p>
                                    <p class="fw-bold">${cliente.visitas || 0}</p>
                                </div>
                                <div class="col-4">
                                    <p class="text-muted small mb-0">Última Visita</p>
                                    <p class="fw-bold">${cliente.fechaRegistro || 'N/A'}</p>
                                </div>
                                <div class="col-4">
                                    <p class="text-muted small mb-0">Gasto Total</p>
                                    <p class="fw-bold text-success">${cliente.gastoTotal || '$0'}</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-md-2 text-md-end mt-2 mt-md-0">
                            <button class="btn btn-outline-secondary btn-sm w-100 btn-ver-perfil" data-client-id="${cliente.id}">
                                <i class="bi bi-eye"></i> Ver Perfil
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // --- 3. RENDERIZAR LISTA DE CLIENTES ---
    function renderizarLista() {
        if (!clientesGrid) return; // Protección si no estamos en la página correcta
        
        clientesGrid.innerHTML = ""; // Limpiar contenedor
        
        // Renderizar todos los clientes del array unificado
        clientes.forEach(c => {
            clientesGrid.insertAdjacentHTML("beforeend", generarTarjetaCliente(c));
        });
    }

    // Llamada inicial para pintar los datos
    renderizarLista();


    // --- 4. GUARDAR NUEVO CLIENTE ---
    if (btnGuardarCliente) {
        btnGuardarCliente.addEventListener('click', function(event) {
            event.preventDefault(); 
            
            if (!formNuevoCliente.checkValidity()) {
                formNuevoCliente.reportValidity();
                return;
            }

            const formData = new FormData(formNuevoCliente);
            const nuevoCliente = {};
            for (const [key, value] of formData.entries()) {
                nuevoCliente[key] = value.trim();
            }

            // Añadir datos automáticos
            nuevoCliente.id = Date.now(); // ID único basado en tiempo
            nuevoCliente.visitas = 1;
            nuevoCliente.gastoTotal = '$0';
            nuevoCliente.fechaRegistro = new Date().toLocaleDateString('es-ES');
            
            // Guardar en array y actualizar LocalStorage
            clientes.push(nuevoCliente);
            localStorage.setItem("clientes", JSON.stringify(clientes));

            // Agregar visualmente al principio o final
            // Opción A: Re-renderizar todo (más seguro)
            renderizarLista();
            
            // Opción B: Inyectar solo el nuevo (tu lógica anterior de 'clientes-nuevos')
            if (clientesNuevosContainer) {
                // Si quieres separarlos visualmente como antes:
                // clientesNuevosContainer.insertAdjacentHTML('beforeend', generarTarjetaCliente(nuevoCliente));
            }

            // Cerrar modal y limpiar
            formNuevoCliente.reset();
            if (modalNuevoCliente) modalNuevoCliente.hide();
            
            // Mostrar confirmación
            const modalConfirmacionEl = document.getElementById('modalConfirmacion');
            if (modalConfirmacionEl) {
                const modalConfirmacion = new bootstrap.Modal(modalConfirmacionEl);
                modalConfirmacion.show();
            }
        });
    }

    // --- 5. FUNCIÓN MOSTRAR PERFIL (LÓGICA DEL MODAL) ---
    function cargarDatosEnModalPerfil(clienteId) {
        const id = parseInt(clienteId);
        // Buscar en el array UNIFICADO de clientes
        const cliente = clientes.find(c => c.id === id);

        if (!cliente) {
            console.error('Cliente no encontrado con ID:', id);
            return;
        }

        // Llenar datos en el HTML del modal
        document.getElementById('perfil-nombre-modal').textContent = cliente.nombre;
        document.getElementById('perfil-email').textContent = cliente.email || 'N/A';
        document.getElementById('perfil-telefono').textContent = cliente.telefono || 'N/A';
        document.getElementById('perfil-direccion').textContent = cliente.direccion || 'N/A';
        document.getElementById('perfil-registro').textContent = cliente.fechaRegistro || 'N/A';
        document.getElementById('perfil-visitas').textContent = cliente.visitas || 0; 
        document.getElementById('perfil-gasto').textContent = cliente.gastoTotal || '$0';
        document.getElementById('perfil-preferencias').textContent = cliente.preferencias || 'Ninguna';
        
        // Badge de segmento
        const badge = document.getElementById('perfil-segmento');
        badge.textContent = cliente.segmento;
        // Limpiar clases anteriores y poner la nueva (simple bg-secondary por defecto o lógica compleja)
        badge.className = 'badge bg-primary mb-3'; 

        // Notas
        const notasArea = document.getElementById('perfil-notas-area');
        if (notasArea) notasArea.value = cliente.notas || '';
    }

    // --- 6. LISTENER DELEGADO PARA EL BOTÓN "VER PERFIL" ---
    document.addEventListener('click', (e) => {
        // Detectar clic en el botón o en el ícono dentro del botón
        const button = e.target.closest('.btn-ver-perfil');
        
        if (button) {
            const clienteId = button.getAttribute('data-client-id');
            if (clienteId && modalVerPerfilInstance) {
                // 1. Cargar datos
                cargarDatosEnModalPerfil(clienteId);
                // 2. Mostrar modal
                modalVerPerfilInstance.show();
            } else {
                console.error("Falta el ID del cliente o la instancia del modal no cargó.");
            }
        }
    });

});

