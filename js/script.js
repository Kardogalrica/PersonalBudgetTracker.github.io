const descricao = document.querySelector('#descricao')
const errorDescricao = document.querySelector('#error-descricao')
const valor = document.querySelector('#valor')
const errorValor = document.querySelector('#error-number')
const despesa = document.querySelector('#despesa')
const errorDespesa = document.querySelector('#error-despesa')
const btn = document.querySelector('#submit')

const saldo = document.querySelector('#saldo')
const historicoGrafico = document.querySelector('#historicoGrafico')

const btnUploadFile = document.querySelector('#btnUpload')

const download = document.querySelector('#download')
const limpar = document.querySelector('#limpar')

const containerLista = document.querySelector('#list')

var type = 0

btn.addEventListener('click', (e) => {
    e.preventDefault()

    var isFormValid = true

    errorDescricao.innerText = ''
    errorValor.innerText = ''
    errorDespesa.innerText = ''

    if(descricao.value === '' || descricao.value.trim() === '') {
        errorDescricao.innerText = 'Campo Obrigatório!'
        isFormValid = false
    }

    if(valor.value <= 0 ) {
        errorValor.innerText = 'Campo Obrigatório!'
        isFormValid = false
    }

    if(!(Number(despesa.value) === 1 || Number(despesa.value) === 2)) {
        errorDespesa.innerText = 'Campo Obrigatório!'
        isFormValid = false
    }

    if(!isFormValid) {
        return
    }
    expense.createExpense(expense.structExpense(descricao.value,valor.value,despesa.value))

    descricao.value = ''
    valor.value = ''
    despesa.value = ''

    descricao.focus()

    visaoGeral.updateVisaoGeral()
    
    list.createList()

    createGrafico.updateGrafico() 

    displayDadtos()

    createMessague('Transação criada com sucesso', 'sucess')

})

btnUploadFile.addEventListener('click', async () => {

    //Valições ao File
    if(document.querySelector('#inputfile').files.length === 0) {
        console.warn('Ficheiro se encontra vazio')
        return
    }
    const dados = await file.obtemConteudoFileInput('inputfile');

    //Validações dados

    if(!dados) {
        createMessague('Ficheiro não existe ou está vazio','info')
        return
    }

    if(!file.validationFile(dados)) {
        createMessague('Dados do excel invalidos','warn')
        return
    }
    const dataTransform = dados.map((obj) => ({
        descricao:obj.descricao,
        valor:Number(obj.valor),
        despesa:((obj.despesa === 'Receita') ? 1 : 2),
        dt:new Date(Number(String(obj.data).split('/')[2]),Number(String(obj.data).split('/')[1]) - 1,Number(String(obj.data).split('/')[0]))
    }))

    dataTransform.forEach((obj) => {
        obj.id = expense.obtemId()
        expense.createExpense(obj)

    })

    visaoGeral.updateVisaoGeral()
    list.createList()
    createGrafico.updateGrafico()

    file.limparInputFile('inputfile','containerChoseInput')

    btnUploadFile.blur()
    displayDadtos()
})

function exportWorksheet(jsonObject) {
    var myFile = "myExpense.xlsx";
    var myWorkSheet = XLSX.utils.json_to_sheet(jsonObject);
    var myWorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "myWorkSheet");
    XLSX.writeFile(myWorkBook, myFile);
}
  
download.addEventListener('click', () => {

    const dataExcel = expense.data.map((obj) => ({
        descricao:obj.descricao,
        valor:obj.valor,
        despesa:((obj.despesa === 1) ? 'Receita' : 'Despesa'),
        data:String(obj.dt.getDate()).padStart(2, '0')+'/'+String(obj.dt.getMonth() + 1).padStart(2, '0')+'/'+obj.dt.getFullYear()
    }))


      
      var jsonDataObject = eval(JSON.stringify(dataExcel));		
          exportWorksheet(jsonDataObject);
});

limpar.addEventListener('click', () => {
    if(confirm('Tem a certeza que pretende limpar todo o histório?')) {
        expense.data = []
        expense.init()

        visaoGeral.updateVisaoGeral()
        list.createList()
        createGrafico.updateGrafico()
        displayDadtos() 

        createMessague('Histórico apagado com sucesso', 'sucess')
    }
})

document.querySelectorAll('[data-type]').forEach((type) => {
    type.addEventListener('click', () => {
        list.setType(Number(type.value))
        list.createList()
    })
})

function displayDadtos() {
    if(expense.data.length === 0) {
        saldo.classList.add('not-visible')
        historicoGrafico.classList.add('not-visible')
    } else {
        saldo.classList.remove('not-visible')
        historicoGrafico.classList.remove('not-visible')
    } 
}

//inicialização pagina
expense.onReady()
visaoGeral.init('saldoActual','totalReceita','totalDespesa')
list.init('list',type)
createGrafico.init('graficoExpense')
displayDadtos()