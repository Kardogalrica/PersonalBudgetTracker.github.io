const createGrafico = {
    containerGrafico: {},
    grafico:{},
    init(graficoId) {
        this.setContainerGrafico(graficoId)
        this.buildChart()
    },
    setContainerGrafico(graficoId) {
        if(!document.querySelector('#'+graficoId)) {
            console.warn('Gráfico não encontrado')
            return
        }

        this.containerGrafico = document.querySelector('#'+graficoId)
    },
    buildChart() {
        this.grafico = new Chart(this.containerGrafico, {
            type:'bar',
            data: {
                labels: expense.dataGrafico.map(obj => obj.mes),
                datasets: [{
                    label:'Total por mês',
                    data: expense.dataGrafico.map(obj => obj.total),
                    backgroundColor: expense.dataGrafico.map(obj => ((obj.total > 0) ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 99, 132, 0.6)')),
                    borderColor: expense.dataGrafico.map(obj => ((obj.total > 0) ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)')),
                    borderWidth: 1
                }]
            },
            options: {
                responsive:true,
                scales: {
                    y: {
                        beginAtZero:true,
                    }
                }
            }
        })
    },
    updateGrafico() {
        const newData = expense.dataGrafico

        // Atualizar os labels e os dados
        this.grafico.data.labels = newData.map(item => item.mes);
        this.grafico.data.datasets[0].data = newData.map(item => item.total);

        // (Opcional) atualizar cores conforme valor
        this.grafico.data.datasets[0].backgroundColor = newData.map(v => v.total >= 0 ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 99, 132, 0.6)');
        this.grafico.data.datasets[0].borderColor = newData.map(v => v.total >= 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)');

        // Atualizar o gráfico
        this.grafico.update();
    },
}