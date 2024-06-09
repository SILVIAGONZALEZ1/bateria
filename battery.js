// Función para verificar el estado de la batería y actualizar el gráfico
function verificarBateria(bateria, grafico) {
    const nivelBateria = bateria.level * 100;
    const estadoCarga = bateria.charging ? 'Cargando' : 'No cargando';

    // Actualizar la interfaz de usuario
    document.getElementById('nivelBateria').textContent = `Nivel de batería: ${nivelBateria.toFixed(2)}%`;
    document.getElementById('estadoCarga').textContent = `Estado de carga: ${estadoCarga}`;

    // Actualizar el gráfico
    const ctx = document.getElementById('graficoBateria').getContext('2d');
    const porcentajeValor = document.getElementById('porcentajeValor');
    porcentajeValor.textContent = `${nivelBateria.toFixed(0)}%`;

    const color = nivelBateria < 10 ? 'red' : 'green';

    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Nivel de batería'],
            datasets: [{
                label: '%',
                data: [nivelBateria, 100 - nivelBateria],
                backgroundColor: [
                    color,
                    '#f0f0f0'
                ],
                borderColor: [
                    color,
                    '#f0f0f0'
                ],
                borderWidth: 1
            }]
        },
        options: {
            cutout: '80%',
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            animation: {
                animateRotate: false,
                animateScale: false
            }
        }
    });

    // Verificar si el nivel de batería es menor al 10% y no está cargándose
    if (nivelBateria < 10 && !bateria.charging) {
        document.getElementById('animacion').classList.add('no-animacion');
        porcentajeValor.style.color = 'red';
        console.log('Desactivando animaciones y decoraciones...');
    } else {
        document.getElementById('animacion').classList.remove('no-animacion');
        porcentajeValor.style.color = 'green';
        console.log('Activando animaciones y decoraciones...');
    }
}

// Función para iniciar la aplicación
async function iniciarApp() {
    try {
        // Obtener la información de la batería
        const bateria = await navigator.getBattery();

        // Llamar a la función de verificación de batería al inicio
        verificarBateria(bateria);

        // Actualizar la información cuando cambie el nivel de batería
        bateria.addEventListener('levelchange', () => {
            verificarBateria(bateria);
        });

        // Actualizar la información cuando cambie el estado de carga
        bateria.addEventListener('chargingchange', () => {
            verificarBateria(bateria);
        });

    } catch (error) {
        console.error('Error al obtener la información de la batería:', error);
    }
}

// Iniciar la aplicación
iniciarApp();



