document.addEventListener('DOMContentLoaded', () => {
    
    // Función para generar un gráfico de tipo Tarta (Doughnut)
    function generarSegmentoChart() {
        const ctx = document.getElementById('segmentoChart');
        // Si el elemento no existe, salimos
        if (!ctx) return;

        // Datos de ejemplo para la distribución del segmento
        const data = {
            labels: ['VIP', 'Frecuente', 'Ocasional', 'Inactivo'],
            datasets: [{
                data: [35, 45, 15, 5], // Porcentajes o conteo
                backgroundColor: [
                    'rgba(111, 66, 193, 0.8)', // Purple (VIP)
                    'rgba(0, 123, 255, 0.8)', // Blue (Frecuente)
                    'rgba(40, 167, 69, 0.8)', // Green (Ocasional)
                    'rgba(108, 117, 125, 0.8)' // Gray (Inactivo)
                ],
                hoverOffset: 10
            }]
        };

        new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: false,
                    }
                }
            },
        });
    }
    
    // Función para generar un gráfico de tipo Barra (Bar)
    function generarGastoChart() {
        const ctx = document.getElementById('gastoChart');
        // Si el elemento no existe, salimos
        if (!ctx) return;

        // Datos de ejemplo para el gasto total
        const data = {
            labels: ['0-10K', '10K-50K', '50K-100K', '100K+'],
            datasets: [{
                label: 'Número de Clientes',
                data: [50, 80, 40, 15],
                backgroundColor: 'rgba(255, 124, 0, 0.8)', // Orange
                borderColor: 'rgba(255, 124, 0, 1)',
                borderWidth: 1
            }]
        };

        new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },
        });
    }

    // Inicializar los gráficos asegurándonos de que el DOM esté cargado
    generarSegmentoChart();
    generarGastoChart();
});