document.querySelectorAll('[data-inputFile]').forEach((containerinputFile) => {
    const inputFile = containerinputFile.children[0]
    const btnChose = containerinputFile.children[1].children[0]
    const containerChose = containerinputFile.children[1].children[1]

    var elsClick = []
    elsClick.push(btnChose)
    elsClick.push(containerChose)

    elsClick.forEach((el) => {
        el.addEventListener('click', (e) => {
            inputFile.click()
        })

        el.addEventListener('keydown', (e) => {
          if(e.key === 'Enter') {
            inputFile.click()
          }
        })
    })

    inputFile.addEventListener('change', (e) => {
        const file = e.target.files[0]
        containerChose.innerText = e.target.files[0].name
    })

})


const file = {
    async obtemConteudoFileInput(idInputFile) {
      const input = document.querySelector('#' + idInputFile);

      if(input.files.length === 0) {
        console.warn('input file vazio')
        return
      }
      
      const selectedFile = input.files[0];
      if (!selectedFile) return;
  
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
  
        reader.onload = function (e) {
          try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
  
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const json = XLSX.utils.sheet_to_json(worksheet); // com headers automáticos
  
            resolve(json);
          } catch (err) {
            reject(err);
          }
        };
  
        reader.onerror = function (err) {
          reject(err);
        };
  
        reader.readAsArrayBuffer(selectedFile);
      });
    },
    limparInputFile(idInputFile,idContainerChose) {
      document.querySelector('#'+idInputFile).value = ''
      document.querySelector('#'+idContainerChose).innerText = 'Escolha um ficheiro'
    },
    validationFile(data) {
      if (Array.isArray(data) && data.every(obj => typeof obj.descricao === 'string' && typeof obj.valor === 'number' && typeof obj.despesa === 'string' && typeof obj.data === 'string')) {
          return true
        } else {
          console.warn("Dados do excel invalidos")
          return false
        }
    },
  };