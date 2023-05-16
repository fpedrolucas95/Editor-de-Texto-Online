(function () {
    // Obtém os elementos da página
    const filenameDiv = document.getElementById('filename');
    const editor = document.getElementById('editor');

    // Função para criar novo arquivo
    function newFile() {
        // Limpa o valor do editor e o nome do arquivo exibido
        editor.value = "";
        filenameDiv.innerHTML = "";
    }

    // Adiciona um ouvinte de eventos para o botão "Novo"
    const newButton = document.getElementById('new-button');
    newButton.addEventListener('click', newFile);

    // Função para abrir arquivo
    function openFile(event) {
        const input = event.target;
        const reader = new FileReader();
        reader.onload = function () {
            // Atualiza o valor do editor e a exibição do nome do arquivo
            editor.value = reader.result;
            const countWords = reader.result.split(" ").length;
            filenameDiv.innerHTML = `${input.files[0].name} <br> Tamanho do arquivo: ${(input.files[0].size / 1024).toFixed(1)} kB <br> Quantidade de caracteres: ${reader.result.length} | Quantidade de palavras: ${countWords}`;
        };
        reader.readAsText(input.files[0]);
    }

    // Função para salvar arquivo
    function saveFile() {
        const text = editor.value;
        const blob = new Blob([text], {
            type: 'text/plain'
        });
        const anchor = document.createElement('a');
        let filename = prompt('Digite o nome do arquivo:', 'meu documento');
        if (!filename.endsWith('.txt')) {
            filename += '.txt';
        }
        anchor.download = filename;
        anchor.href = window.URL.createObjectURL(blob);
        anchor.target = '_blank';
        anchor.click();

        // Atualiza o nome do arquivo exibido na tela
        filenameDiv.innerHTML = filename;

        // Exibe a notificação de sucesso
        showNotification("Arquivo salvo com sucesso!");
    }

    // Função para exibir notificações
    function showNotification(message) {
        // Cria a notificação e adiciona ao corpo do documento
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Remove a notificação após 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Função para imprimir texto
    function printTextarea() {
        // Criar uma nova janela
        const printWindow = window.open('', '_blank');

        if (printWindow) { // Checa se a janela foi aberta com sucesso
            // Recupera o título da página e o conteúdo do editor
            const title = document.getElementById('page-title').innerHTML;
            const content = editor.value;

            // Cria um HTML para a nova janela
            printWindow.document.write(`
            <html>
                <head>
                    <title>${title}</title>
                </head>
                <body onload="window.print();window.close()">
                    <pre>${content}</pre>
                </body>
            </html>
        `);

            // Focus na janela de impressão
            printWindow.document.close();
            printWindow.focus();

        } else {
            // Emite um alerta se a janela não pôde ser aberta
            alert('Não foi possível abrir a janela de impressão. Por favor, desabilite qualquer bloqueador de pop-ups e tente novamente.');
        }
    }

    // Adiciona ouvintes de eventos para os botões
    document.getElementById('open-button').addEventListener('click', function () {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt';
        input.addEventListener('change', openFile);
        input.click();
    });
    document.getElementById('save-button').addEventListener('click', saveFile);
    document.getElementById('print-button').addEventListener('click', printTextarea);

    // Adiciona um ouvinte de eventos para salvar com Ctrl+S ou Cmd+S
    editor.addEventListener('keydown', function (e) {
        if (e.keyCode === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
            e.preventDefault();
            saveFile();
        }
    });

    // Função de busca e troca de palavras
    function searchAndReplace() {
        const searchTerm = prompt("Digite a palavra ou frase a ser procurada:");

        // Verifique se o usuário inseriu um termo de pesquisa
        if (!searchTerm) {
            alert("Por favor, insira um termo de pesquisa válido.");
            return;
        }

        const replaceTerm = prompt("Digite a palavra ou frase de substituição:");

        // Verifique se o usuário inseriu um termo de substituição
        if (replaceTerm === null) {
            alert("Por favor, insira um termo de substituição válido.");
            return;
        }

        const text = editor.value;

        // Usa expressão regular para substituir todas as ocorrências da palavra ou frase de busca pelo termo de substituição
        const updatedText = text.replace(new RegExp(searchTerm, "g"), replaceTerm);

        // Atualiza o texto do editor com o texto atualizado
        editor.value = updatedText;
    }

    // Adiciona um ouvinte de eventos para o botão "Busca e Troca"
    const searchReplaceButton = document.getElementById("search-replace-button");
    searchReplaceButton.addEventListener("click", searchAndReplace);

    // Selecione o botão de tema escuro
    const darkThemeButton = document.getElementById('dark-theme-btn');

    // Adicione um evento de clique ao botão
    darkThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            darkThemeButton.textContent = 'Tema claro';
        } else {
            darkThemeButton.textContent = 'Tema escuro';
        }
    });

    // Armazena o histórico de revisões do texto
    let revisionHistory = [];

    // Função de salvar revisão
    function saveRevision() {
        revisionHistory.push(editor.value);
    }

    // Função de reverter para revisão anterior
    function revertToPrevious() {
        if (revisionHistory.length > 0) {
            const previousRevision = revisionHistory.pop();
            editor.value = previousRevision;
        } else {
            alert("Não há revisões anteriores disponíveis!");
        }
    }

    // Adiciona ouvintes de eventos para os botões de revisão
    const saveRevisionButton = document.getElementById("save-revision-button");
    saveRevisionButton.addEventListener("click", saveRevision);
    const revertButton = document.getElementById("revert-button");
    revertButton.addEventListener("click", revertToPrevious);

    // Exibe o log da aplicação
    function showLog() {
        editor.value = "Parabéns! Você encontrou o Easter Egg!\nAgora você pode continuar editando seu texto como de costume.";
    }

    // Adiciona um ouvinte de eventos para a imagem (Easter Egg)
    const img = document.getElementById('img');
    img.addEventListener('click', showLog);
})();
