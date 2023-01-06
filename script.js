(function() {
    const filenameDiv = document.getElementById('filename');
    const openButton = document.getElementById('open-button');
    const saveButton = document.getElementById('save-button');
    const printButton = document.getElementById('print-button');
    const darkThemeBtn = document.getElementById('dark-theme-btn');
    const editor = document.getElementById('editor');

    // Função para criar novo arquivo
    function newFile() {
        editor.value = "";
        filenameDiv.innerHTML = "Novo arquivo";
    }

    // Adiciona event listener para o botão "Novo"
    const newButton = document.getElementById('new-button');
    newButton.addEventListener('click', newFile);

    // Função para abrir arquivo
    function openFile(event) {
        const input = event.target;
        const reader = new FileReader();
        reader.onload = function () {
            editor.value = reader.result;
            const countWords = reader.result.split(" ").length;
            filenameDiv.innerHTML = `${input.files[0].name} (${input.files[0].size} bytes, ${countWords} palavras, ${reader.result.length} caracteres)`;
        };
        reader.readAsText(input.files[0]);
    }

    // Função para salvar arquivo
    function saveFile() {
        const text = editor.value;
        const blob = new Blob([text], { type: 'text/plain' });
        const anchor = document.createElement('a');
        let filename = prompt('Digite o nome do arquivo:', filenameDiv.innerHTML || 'Nome do arquivo');
        if (!filename.endsWith('.txt')) {
            filename += '.txt';
        }
        anchor.download = filename;
        anchor.href = window.URL.createObjectURL(blob);
        anchor.target = '_blank';
        anchor.click();
    }

    // Função para imprimir texto
    function printTextarea() {
        // Crie uma nova janela e defina o conteúdo do textarea como seu conteúdo
        const printWindow = window.open();
        printWindow.document.write('<html><head><title>' + document.getElementById('page-title').innerHTML + '</title></head>' +
            '<body>' + editor.value + '</body></html>');
        // Imprima a janela
        printWindow.print();
    }


    // Adicione event listeners aos botões
    document.getElementById('open-button').addEventListener('click', function () {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt';
        input.addEventListener('change', openFile);
        input.click();
    });
    document.getElementById('save-button').addEventListener('click', saveFile);
    document.getElementById('print-button').addEventListener('click', printTextarea);

    // Adicione event listener para salvar com Ctrl+S ou Cmd+S
    document.getElementById('editor').addEventListener('keydown', function (e) {
        if (e.keyCode === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
            e.preventDefault();
            saveFile();
        }
    });

    // Função de busca e troca de palavras
    function searchAndReplace() {
        // Obtém a palavra ou frase a ser procurada e a palavra ou frase de substituição do usuário
        const searchTerm = prompt("Digite a palavra ou frase a ser procurada:");
        const replaceTerm = prompt("Digite a palavra ou frase de substituição:");

        // Armazena o texto atual do editor em uma variável
        const text = editor.value;

        // Usa expressão regular para substituir todas as ocorrências da palavra ou frase de busca pelo termo de substituição
        const updatedText = text.replace(new RegExp(searchTerm, "g"), replaceTerm);

        // Atualiza o texto do editor com o texto atualizado
        editor.value = updatedText;
    }

    // Adiciona event listener para o novo botão "Busca e Troca"
    const searchReplaceButton = document.getElementById("search-replace-button");
    searchReplaceButton.addEventListener("click", searchAndReplace);


    // Selecione o botão de tema escuro
    const darkThemeButton = document.querySelector('#dark-theme-btn');

    // Adicione um evento de clique ao botão
    darkThemeButton.addEventListener('click', () => {
        // Adicione a classe 'dark-theme' à tag 'body'
        document.body.classList.toggle('dark-theme');
    });

    // Armazena o histórico de revisões do texto
    let revisionHistory = [];

    // Função de salvar revisão
    function saveRevision() {
        // Armazena o texto atual do editor no histórico de revisões
        revisionHistory.push(editor.value);
    }

    // Função de reverter para revisão anterior
    function revertToPrevious() {
        // Verifica se há revisões anteriores disponíveis
        if (revisionHistory.length > 0) {
            // Remove a última revisão do histórico
            const previousRevision = revisionHistory.pop();

            // Atualiza o texto do editor com a revisão anterior
            editor.value = previousRevision;
        } else {
            alert("Não há revisões anteriores disponíveis!");
        }
    }

    // Adiciona event listener para o novo botão "Salvar Revisão"
    const saveRevisionButton = document.getElementById("save-revision-button");
    saveRevisionButton.addEventListener("click", saveRevision);

    // Adiciona event listener para o novo botão "Reverter para Revisão Anterior"
    const revertButton = document.getElementById("revert-button");
    revertButton.addEventListener("click", revertToPrevious);
})();

