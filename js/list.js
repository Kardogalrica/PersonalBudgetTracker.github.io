const list = {
    containerLista:{},
    type:0,
    init(idLista,type) {
        this.setContainerList(idLista)
        this.setType(type)
        this.createList()
    },
    setContainerList(idLista) {
        if(!document.querySelector('#'+idLista)) {
            console.warn('Lista Histórico não encontrado')
            return
        }
        this.containerLista = document.querySelector('#'+idLista)
    },
    setType(type) {
        this.type = type || 0
    },
    createList() {

        this.containerLista.innerHTML = ''
        const data = this.obtemLista()

        data.forEach((obj) => {
            this.containerLista.appendChild(this.createItemList(obj.id,obj.descricao,obj.valor,obj.despesa,obj.dt))
        })
    },
    createItemList(id,descricao,valor,despesa,data) {
        
        const item = document.createElement('div')
        item.classList.add('display-flex','flex-direction-row','align-items-center','gap-base')
        item.setAttribute('tabindex', '0')

        item.addEventListener('keydown', (e) => {
            if(e.altKey && e.ctrlKey && e.key === 'd') {
                if(confirm('Tem a certeza que pretende apagar a transação '+descricao+'?')) {
                    expense.deleteExpense(id)
                    visaoGeral.updateVisaoGeral()
                    this.createList()
                    createGrafico.updateGrafico() 
                    createMessague('Transação apagada com sucesso', 'sucess')
                }    
            }
        })

        const dataItem = document.createElement('div')
        dataItem.classList.add('flex1','display-flex','flex-direction-column')

        const dataItemGeral = document.createElement('div')
        dataItemGeral.classList.add('display-flex','justify-content-space-between')

        const dataItemGeralDescricao = document.createElement('div')
        dataItemGeralDescricao.innerText = descricao
        const dataItemGeralValor = document.createElement('div')
        dataItemGeralValor.innerText = ((despesa === 1) ? '+ ' : ' -')+valor+'€'
        if(despesa === 1) {
            dataItemGeralValor.classList.add('text-success')
        } else {
            dataItemGeralValor.classList.add('text-error')
        }

        dataItemGeral.appendChild(dataItemGeralDescricao)
        dataItemGeral.appendChild(dataItemGeralValor)

        const dataItemNota = document.createElement('div')
        dataItemNota.classList.add('display-flex','justify-content-space-between','nota')

        const dataItemNotaData = document.createElement('div')
        dataItemNotaData.innerText = String(data.getDate()).padStart(2, '0')+'/'+String(data.getMonth() + 1).padStart(2, '0')+'/'+data.getFullYear()
        const dataItemNotaDespesa = document.createElement('div')
        dataItemNotaDespesa.innerText = ((despesa === 1) ? 'Receita' : 'Despesa')

        dataItemNota.appendChild(dataItemNotaData)
        dataItemNota.appendChild(dataItemNotaDespesa)

        dataItem.appendChild(dataItemGeral)
        dataItem.appendChild(dataItemNota)


        const dataItemAction = document.createElement('div')
        const i = document.createElement('i')
        i.classList.add('fa','fa-circle-minus','text-info','cursor-pointer')
        i.title="Apagar Transação"

        i.addEventListener('click', () => {
            if(confirm('Tem a certeza que pretende apagar a transação '+descricao+'?')) {
                expense.deleteExpense(id)
                visaoGeral.updateVisaoGeral()
                this.createList()
                createGrafico.updateGrafico() 
                createMessague('Transação apagada com sucesso', 'sucess')
            }

        })

        dataItemAction.appendChild(i)

        item.appendChild(dataItem)
        item.appendChild(dataItemAction)

        return item
    },
    obtemLista() {
        var data = []
        switch(this.type) {
            case 1:
                data = expense.data.filter(obj => obj.despesa === 1)
                break;
            case 2:
                data = expense.data.filter(obj => obj.despesa === 2)
                break;
            default:
                data = expense.data
                break;
        }

        return data
    }
}