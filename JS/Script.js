document.addEventListener("DOMContentLoaded", function () {

    // Inicialização do Carrossel do Bootstrap
    const carouselElement = document.getElementById("carouselGolden");
    if (carouselElement && typeof bootstrap !== "undefined") {
        new bootstrap.Carousel(carouselElement, {
            interval: 3000,
            ride: "carousel"
        });
    }

    // Saudação temporal no topo
    function carregarSaudacao() {
        const elementoSaudacao = document.getElementById("saudacao-temporal");
        const hora = new Date().getHours();
        let texto = "";

        if (hora >= 5 && hora < 12) {
            texto = "Bom dia! Bem-vindo ao PetShop Golden Shower.";
        } else if (hora >= 12 && hora < 18) {
            texto = "Boa tarde! Confira nossos serviços para o seu Golden.";
        } else {
            texto = "Boa noite! Agende o banho do seu pet para esta semana.";
        }

        if (elementoSaudacao) {
            elementoSaudacao.textContent = texto;
        }
    }

    carregarSaudacao();

    // Alternar Modo de Alto Contraste
    const btnContraste = document.getElementById("btn-contraste");
    if (btnContraste) {
        btnContraste.addEventListener("click", function () {
            document.body.classList.toggle("alto-contraste");
        });
    }

    // Lógica Dinâmica do Agendamento (Preço e Modalidade)
    const selectServico = document.getElementById("selectServico");
    const modTele = document.getElementById("modTele");
    const elementoValor = document.getElementById("valorServico");

    function atualizarRegrasAgendamento() {
        if (!selectServico || !elementoValor) return;

        const servico = selectServico.value;
        let preco = 0;

        if (servico === "Banho e Tosa Completo") {
            // O serviço custa R$ 150 fixo, independentemente da escolha de entrega/tele-busca
            preco = 150;
        } else if (servico === "Banho e Tosa Simples") {
            // Se for Banho Simples, a tele-busca adiciona custo (R$ 110 sem tele / R$ 130 com tele)
            const comTele = modTele && modTele.checked;
            preco = comTele ? 130 : 110;
        }

        elementoValor.textContent = preco > 0 ? `R$ ${preco},00` : "R$ 0,00";
    }

    // Escuta a alteração da seleção do serviço
    if (selectServico) {
        selectServico.addEventListener("change", function () {
            // Quando seleciona o "Banho e Tosa Completo", marca a Tele-busca por padrão
            if (this.value === "Banho e Tosa Completo" && modTele) {
                modTele.checked = true;
            }
            atualizarRegrasAgendamento();
        });
    }

    // Escuta a troca de qualquer opção de rádio da modalidade
    const radiosModalidade = document.querySelectorAll('input[name="modalidade"]');
    radiosModalidade.forEach(radio => {
        radio.addEventListener("change", atualizarRegrasAgendamento);
    });

    // Submissão do Formulário de Cadastro
    const formCadastro = document.getElementById("form-cadastro");
    if (formCadastro) {
        formCadastro.addEventListener("submit", function (e) {
            e.preventDefault();
            const cliente = document.getElementById("nomeCliente").value;
            const pet = document.getElementById("nomePet").value;
            alert(`Cadastro efetuado com sucesso!\nTutor: ${cliente}\nPet: ${pet}`);
            formCadastro.reset();
        });
    }

    // Submissão do Formulário de Agendamento
    const formAgendamento = document.getElementById("form-agendamento");
    if (formAgendamento) {
        formAgendamento.addEventListener("submit", function (e) {
            e.preventDefault();
            const servico = selectServico.value;
            const modalidadeElement = document.querySelector('input[name="modalidade"]:checked');
            const modalidade = modalidadeElement ? modalidadeElement.value : "Não informada";
            const data = document.getElementById("dataAgendamento").value;
            const hora = document.getElementById("horaAgendamento").value;
            const valor = elementoValor.textContent;

            alert(`Agendamento confirmado!\nServiço: ${servico}\nModalidade: ${modalidade}\nValor: ${valor}\nData: ${data} às ${hora}`);
            formAgendamento.reset();
            elementoValor.textContent = "R$ 0,00";
        });
    }
});