// ========================================
// CARGA DE PORTAFOLIO DESDE JSON
// ========================================
const portfolio = document.querySelector("#portafolio");

async function datos(raw) {
    try {
        let consulta = await fetch(raw);
        let trabajos = await consulta.json();
        console.log(trabajos);
        trabajos.forEach((trabajo) => {
            portfolio.innerHTML += `
        <div class="col">
            <div class="card shadow-sm h-100">
                <img src="${trabajo.imagen}" class="card-img-top" alt="${trabajo.titulo}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${trabajo.titulo}</h5>
                    <p class="card-text text-muted">${trabajo.descripcion}</p>
                    <div class="d-flex justify-content-between align-items-center mt-auto">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary disabled">${trabajo.categoria}</button>
                        </div>
                        <small class="text-body-secondary">Reciente</small>
                    </div>
                </div>
            </div>
        </div>`;
        });
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
}

// Solo cargar si existe el elemento #portafolio
if (portfolio) {
    datos("https://raw.githubusercontent.com/Mikuby11/Clase_10/refs/heads/main/datos.json");
}

// ========================================
// TABLA DE HABILIDADES
// ========================================

// Definir habilidades
const habilidades = [
    {programa:"Photoshop", valor:"10"},
    {programa:"Illustrator", valor:"50"},
    {programa:"Indesign", valor:"30"},
    {programa:"Fusion", valor:"100"},
    {programa:"Figma", valor:"60"},
    {programa:"Canva", valor:"90"},
];

const donde = document.querySelector("#aqui");

if (donde) {
    habilidades.forEach((h) => {
        donde.innerHTML += `<tr>
                            <td class="fw-bold">${h.programa}</td>
                            <td>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 8"> 
                                    <rect width="${h.valor}" height="8" rx="4"/>
                                </svg>
                            </td>
                        </tr>`;
    });
}

// ========================================
// GRÁFICO
// ========================================

// Datos del gráfico
const datosChart = {
    labels: ['Trabajo 1','Trabajo 2','Trabajo 3','Trabajo 4','Trabajo 5','Trabajo 6',
             'Trabajo 7','Trabajo 8','Trabajo 9','Trabajo 10','Trabajo 11','Trabajo 12'],
    valores: [90, 70, 85, 100, 60, 95, 80, 75, 100, 85, 65, 90]
};

function crearGrafico() {
    const ctx = document.getElementById('graficoBarras');
    if (!ctx) return null;

    // Colores de la paleta Mikuby
    const colorRojo = 'rgba(200, 0, 54, 0.7)';
    const colorRojoBorde = '#C80036';
    const colorRosa = 'rgba(255, 105, 105, 0.7)';
    const colorRosaBorde = '#FF6969';
    const colorAzul = 'rgba(12, 24, 68, 0.7)';
    const colorAzulBorde = '#0C1844';

    // Alternar colores para cada barra
    const backgroundColors = datosChart.valores.map((_, i) => {
        if (i % 3 === 0) return colorRojo;
        if (i % 3 === 1) return colorRosa;
        return colorAzul;
    });

    const borderColors = datosChart.valores.map((_, i) => {
        if (i % 3 === 0) return colorRojoBorde;
        if (i % 3 === 1) return colorRosaBorde;
        return colorAzulBorde;
    });

    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: datosChart.labels,
            datasets: [{
                label: 'Nivel de satisfacción (%)',
                data: datosChart.valores,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 3,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#0C1844',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#0C1844',
                    titleColor: '#FFF5E1',
                    bodyColor: '#FFF5E1',
                    borderColor: '#C80036',
                    borderWidth: 2,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return ' Satisfacción: ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { 
                        color: '#0C1844',
                        font: {
                            weight: 'bold'
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(12, 24, 68, 0.1)'
                    }
                },
                x: {
                    ticks: { 
                        color: '#0C1844',
                        font: {
                            weight: 'bold',
                            size: 11
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Inicializar el gráfico cuando la página cargue
if (document.getElementById('graficoBarras')) {
    crearGrafico();
}