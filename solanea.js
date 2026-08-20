//inicio do js dos botoes na area do perfil do vereador

const tabBtns = document.querySelectorAll('.tab-btn');
const tabPaineis = document.querySelectorAll('.painel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const alvo = btn.dataset.tab;

        tabBtns.forEach(b => b.classList.remove('ativo'));
        tabPaineis.forEach(p => p.classList.remove('ativo'));

        btn.classList.add('ativo');
        document.getElementById(alvo).classList.add('ativo');
    });
});

// fim do js dos botoes na area do perfil do vereador

//filtro de busca na area do perfil do vereador
const inputNome = document.getElementById('filtro-nome');
const selectCargo = document.getElementById('filtro-cargo');
const btnPesquisar = document.getElementById('btn-pesquisar');
const btnLimpar = document.getElementById('btn-limpar');
const cardVereadores = document.querySelectorAll('.card-vereador');
const contagemTexto = document.getElementById('lista-contagem');

if (btnPesquisar) {
    function filtrarVereadores() {
        const nomeDigitado = inputNome.value.trim().toLowerCase();
        const cargoSelecionado = selectCargo.value;

        let visiveisCount = 0;

        cardVereadores.forEach(card => {
            const nomeCard = card.dataset.nome.toLowerCase();
            const cargoCard = card.dataset.cargo;

            const bateNome = nomeCard.includes(nomeDigitado);
            const bateCargo = cargoSelecionado === '' || cargoCard === cargoSelecionado;

            if (bateNome && bateCargo) {
                card.style.display = 'flex';
                visiveisCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (contagemTexto) {
            contagemTexto.textContent = `Foram encontrados: ${visiveisCount} registro${visiveisCount !== 1 ? 's' : ''}`;
        }
    }

    btnPesquisar.addEventListener('click', filtrarVereadores);

    inputNome.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            filtrarVereadores();
        }
    });

    btnLimpar.addEventListener('click', () => {
        inputNome.value = '';
        selectCargo.selectedIndex = 0;

        cardVereadores.forEach(card => {
            card.style.display = 'flex';
        });

        if (contagemTexto) {
            contagemTexto.textContent = `Foram encontrados ${cardVereadores.length} registros`;
        }
    });
}


//fim do filtro de busca na area do perfil do vereador

// Gráficos

// Gráfico de barras horizontais


const tiposMaterias = [
    'REQUERIMENTO - PARA O EXECUTIVO ',
    'PROJETO DE LEI - LEGISLATIVO',
    'MOÇÃO DE APLAUSOS E RECONHECIMENTO',
    'PROJETO DE DECRETO LEGISLATIVO'
];

const quantidades = [35, 3, 1, 1];
const coresMaterias = ['#20b36b', '#fa5b3d', '#ae5bb8', '#2cb0b7'];
const canvasQuantidade = document.getElementById('graficoQuantidade');
const canvasPercentual = document   .getElementById('graficoPercentual');

if (canvasQuantidade) {
    new Chart(canvasQuantidade, { // cria um gráfico de barras horizontais
        type: 'bar',
        data: {
            labels: tiposMaterias, // define os rótulos do eixo y com os tipos de matérias
            datasets: [{
                data: quantidades,
                backgroundColor: coresMaterias, 
                borderRadius: 5,
                barThickness: 45  //define a espessura das barras do gráfico
            }]
        },
        options: {
            indexAxis: 'y', //inverte o eixo para que as barras fiquem horizontais
            responsive: true,
            maintainAspectRatio: false, //permite que o gráfico se ajuste ao tamanho do contêiner
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        generateLabels: (chart) => chart.data.labels.map((texto, indice) => ({  // gera os rótulos da legenda com base nos rótulos do eixo y
                            text: texto,                                                        // define o texto do rótulo da legenda
                            fillStyle: chart.data.datasets[0].backgroundColor[indice],          // define a cor do rótulo da legenda com base na cor da barra correspondente
                            strokeStyle: chart.data.datasets[0].backgroundColor[indice],        // define a cor da borda do rótulo da legenda com base na cor da barra correspondente
                            hidden: false,
                            index: indice       // define o índice do rótulo da legenda com base no índice do rótulo do eixo y
                        }))
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true // começa o eixo x do gráfico a partir de zero
                }
            }
        }
    });
}

// Gráfico de pizza



if (canvasPercentual) {
    new Chart(canvasPercentual, {
        type: 'pie',
        data: {
            labels: tiposMaterias,  // define os rótulos do gráfico com os tipos de matérias
            datasets: [{
                data: quantidades,
                backgroundColor: coresMaterias
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {      // configurações do plugin de legenda
                legend: {   // exibe a legenda do gráfico
                    display: true,  // exibe a legenda do gráfico
                    position: 'bottom'  // define a posição da legenda do gráfico
                }
            }
        }
    });
}

//fim dos gráficos