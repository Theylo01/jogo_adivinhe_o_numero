function sortear_number(){
    let numero = Math.floor(Math.random() * 100) + 1;
    return numero
}

function limpar_tela(){
    document.querySelector(".para_jogar").innerHTML = "";
}

function inserir_title(string, tipo) {
    let title = document.createElement(tipo);
    title.innerHTML = string;
    return title
}

function voltar_dificuldade(){
    limpar_tela();
    let tela = document.getElementById("para_jogar");
    tela.innerHTML = `
        <h1>Bem-vindo ao jogo de adivinhação!!</h1>
        <h2>Escolha a dificuldade:</h2>
        <div class="dificuldade">
            <button onclick="btn1()">Fácil</button>
            <button onclick="btn2e3(10)">Médio</button>
            <button onclick="btn2e3(3)">Difícil</button>
        </div>
    `;
}

function verificador(sorteado, escolhido){
    if (sorteado == escolhido){
        Swal.fire({
            title: "Resposta correta!",
            text: "Voltar para o menu de selecão?",
            icon: "success",
            confirmButtonText: "Confirmar",
        }).then(()=>{
            setTimeout(voltar_dificuldade, 2000);
        });
    ;}

    else if (escolhido < sorteado){
        Swal.fire({
            title: "Resposta incorreta!",
            text: `O número sorteado é maior que ${escolhido}`,
            icon: "error",
            confirmButtonText: "Confirmar",
        });

    }
    else{
            Swal.fire({
            title: "Resposta incorreta!",
            text: `O número sorteado é menor que ${escolhido}`,
            icon: "error",
            confirmButtonText: "Confirmar",
        });
    }
}

function btn1(){

    limpar_tela();

    let numero_sorteado = sortear_number();

    let elementos = document.createElement("div");
    elementos.classList.add("elementos");

    let campo = document.createElement("input");
    campo.type = "number";
    campo.min = "1";
    campo.max = "100";
    campo.id = "numero";

    let label = document.createElement("label");
    label.htmlFor = "numero";
    label.textContent = "Insira um número:";

    let botao = document.createElement("button");
    botao.innerHTML = "Adivinhar";

    elementos.appendChild(inserir_title("Um número foi sorteado entre 1 e 100","h1"));

    elementos.appendChild(label);
    elementos.appendChild(campo);
    elementos.appendChild(botao);

    elementos.appendChild(inserir_title("Sem limite de tentativas","h2"));

    let nova_tela = document.getElementById("para_jogar");
    nova_tela.appendChild(elementos);

    botao.onclick = function(){

        let escolhido = Number(campo.value);

        verificador(numero_sorteado, escolhido);

        if (escolhido == numero_sorteado){
            botao.disabled = true;
            campo.disabled = true;
        }
    }
}

function btn2e3(n){

    limpar_tela();
    let tentativas = n;

    let contador = inserir_title(`Você tem ${tentativas} tentativas`,"h2");

    let numero_sorteado = sortear_number();

    let elementos = document.createElement("div");
    elementos.classList.add("elementos");

    let campo = document.createElement("input");
    campo.type = "number";
    campo.min = "1";
    campo.max = "100";
    campo.id = "numero";

    let label = document.createElement("label");
    label.htmlFor = "numero";
    label.textContent = "Insira um número:";

    let botao = document.createElement("button");
    botao.innerHTML = "Adivinhar";

    elementos.appendChild(inserir_title("Um número foi sorteado entre 1 e 100","h1"));

    elementos.appendChild(label);
    elementos.appendChild(campo);
    elementos.appendChild(botao);

    elementos.appendChild(contador);

    let nova_tela = document.getElementById("para_jogar");
    nova_tela.appendChild(elementos);

    botao.onclick = function(){
        if(tentativas > 0){
            let escolhido = Number(campo.value);
            verificador(numero_sorteado, escolhido);
            tentativas--;
            contador.innerHTML = `Você tem ${tentativas} tentativas`;

            if (escolhido == numero_sorteado || tentativas == 0){
                botao.disabled = true;
                campo.disabled = true;
            }
            if(tentativas == 0 && escolhido != numero_sorteado){
                Swal.fire({
                    title: "Esgotou todas as suas tentativas!",
                    text: "Voltar para o menu de selecão?",
                    icon: "error",
                    confirmButtonText: "Confirmar",
                }).then(()=>{
                    setTimeout(voltar_dificuldade, 2000);
                });
            }
        }
    }
}

Swal.fire({
  title: "Sobre o jogo",
  text: `Adivinhe o Número é um jogo de adivinhação em que você deve descobrir um número sorteado aleatoriamente entre 1 e 100. Escolha entre os modos Fácil, Médio ou Difícil, cada um com uma quantidade diferente de tentativas. A cada palpite, o jogo indica se o número sorteado é maior ou menor que sua escolha.`,
  icon: "info",
  confirmButtonText: "Entendi",
});