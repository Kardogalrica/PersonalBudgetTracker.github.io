const expense = {
    data:[],
    totalReceita:0,
    totalDespesa:0,
    dataGrafico:[],
    onReady() {
        var dataDummy = []
        if(this.validationLocalStorage()) {
              dataDummy = JSON.parse(localStorage.getItem('dataExpense'))
         }

        this.data = dataDummy.map((obj) => ({id:obj.id,descricao:obj.descricao,valor:obj.valor,despesa:obj.despesa,dt:new Date(obj.dt)}))

        this.UpdateTotais()
    },
    init() {
        this.UpdateTotais()

        if(this.validationDataExpense()) {
            localStorage.setItem('dataExpense', JSON.stringify(this.data))
        } else {
            localStorage.removeItem('dataExpense')
            console.error('Erro ao gravar na localStorage')
        }
        
    },
    createExpense(obj) {
        this.data.push(obj)
        this.init()
    },
    deleteExpense(id) {
        const dataExpense = this.data.filter(item => item.id === id)
        const index = this.data.indexOf(dataExpense[0])
        this.data.splice(index, 1)
        this.init()
    },
    UpdateTotais() {
        if(this.data.filter(obj => obj.despesa === 1).length === 0) {
            this.totalReceita = 0
        } else {
            this.totalReceita = this.data.filter(obj => obj.despesa === 1).map((obj) => obj.valor).reduce((ac, el) => ac + el, 0)
        }
        
        if(this.data.filter(obj => obj.despesa === 2).length === 0) {
            this.totalDespesa = 0
        } else {
            this.totalDespesa = this.data.filter(obj => obj.despesa === 2).map((obj) => obj.valor).reduce((ac, el) => ac + el, 0)
        }

        const agrupado = this.data.map((obj) => ({
            valor: (obj.despesa === 2 ? obj.valor * -1 : obj.valor),
            dt: new Date(obj.dt).toISOString().slice(0, 7)
          })).reduce((acc, obj) => {
            if (!acc[obj.dt]) {
              acc[obj.dt] = 0;
            }
            acc[obj.dt] += obj.valor;
            return acc;
          }, {});
          
          // Converte o objeto em array de objetos para usar em gráfico, etc.
          this.dataGrafico = Object.entries(agrupado).map(([mes, total]) => ({
            mes,
            total
          }));

    },
    structExpense(descricao, valor, despesa) {
        var obj = {
            id:this.obtemId(),
            descricao:descricao,
            valor:Number(valor),
            despesa:Number(despesa),
            dt:new Date()
        }

        return obj
    },
    obtemId() {
        if(this.data.length === 0) {
            return 1
        } else {
            return this.data[this.data.length -1].id + 1
        }
    },
    validationDataExpense() {
        var isvalid = true
    
        if(!Array.isArray(this.data) && this.data.every(obj => typeof obj.id !== 'number' || typeof obj.descricao !== 'string' || typeof obj.valor != 'number' || typeof obj.despesa != 'number' || typeof obj.dt != 'object')) {
            isvalid = false
        }
    
        const idPreenchido = this.data.filter(obj => obj.id <= 0)
    
        if(idPreenchido.length != 0) {
            isvalid = false
        }
    
        const expensePreenchido = this.data.filter(obj => obj.descricao.trim() === '' || obj.valor <= 0)
    
        if(expensePreenchido.length != 0) {
            isvalid = false
        }
    
        return isvalid
    
    },
    validationLocalStorage() {
        try {
            const raw = localStorage.getItem('dataExpense')
          
            if (raw) {
              const parsed = JSON.parse(raw)
        
              if (Array.isArray(parsed) && parsed.every(obj => typeof obj.id === 'number' && typeof obj.descricao === 'string' && typeof obj.valor === 'number' && typeof obj.despesa === 'number' && typeof obj.dt === 'string')) {
                return true
              } else {
                console.warn("Dados no localStorage não são um array. Resetado.")
                localStorage.removeItem('dataExpense')
                return false
              }
            }
          } catch (e) {
            console.error("Erro ao fazer parse dos dados:", e)
            localStorage.removeItem('dataExpense')
            return false
          }
    },
}

const visaoGeral = {
    containerSaldoTota:{},
    containerReceitas:{},
    conteinerDespesa:{},
    init(containerSaldoTotalid,containerReceitas,conteinerDespesa) {
        this.setContainerSaldoTota(containerSaldoTotalid)
        this.setContainerReceitas(containerReceitas)
        this.setconteinerDespesa(conteinerDespesa)

        this.updateVisaoGeral()
    },
    setContainerSaldoTota(containerSaldoTotalid) {
        if(!document.querySelector('#'+containerSaldoTotalid)) {
            console.warn('Container com saldo Total não encontrado')
            return
        }
        this.containerSaldoTota = document.querySelector('#'+containerSaldoTotalid)
    },
    setContainerReceitas(containerReceitas) {
        if(!document.querySelector('#'+containerReceitas)) {
            console.warn('Container com saldo das Receitas não encontrado')
            return
        }
        this.containerReceitas = document.querySelector('#'+containerReceitas)
    },
    setconteinerDespesa(conteinerDespesa) {
        if(!document.querySelector('#'+conteinerDespesa)) {
            console.warn('Container com saldo das Despesas não encontrado')
            return
        }
        this.conteinerDespesa = document.querySelector('#'+conteinerDespesa)
    },
    updateVisaoGeral(){
        const total = expense.totalReceita - expense.totalDespesa
        var classHeader = ((total < 0) ? 'text-error' : 'text-success')
            this.containerSaldoTota.innerText = total+'€'
            this.containerSaldoTota.classList.remove('text-error')
            this.containerSaldoTota.classList.remove('text-success')
            this.containerSaldoTota.classList.add(classHeader)

            this.containerReceitas.innerText = ((total === 0) ? '' : '+ ')+expense.totalReceita+'€'

            this.conteinerDespesa.innerText = ((total === 0) ? '' : '- ')+expense.totalDespesa+'€'
    },
}