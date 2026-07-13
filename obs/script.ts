const botaoNao = document.getElementById("nao") as HTMLInputElement;
const botaoSim = document.getElementById("sim") as HTMLInputElement;
const sessao1 = document.getElementById("sessao1") as HTMLInputElement;
const sessao2 = document.getElementById("sessao2") as HTMLInputElement;
const finaliza = document.getElementById("finalizar") as HTMLInputElement;

let convite="";

const sairIF="Voce pode ter pensado, o que vamos fazer indo ao IF(Faculdade nas ferias?? credooo)."
            +" Porem não iremos lá so andar por que vi alguns lugares,até mesmo na entrada,"
            +" que achei muito fofos e confortaveis pra gente poder sentar e conversar, comer algumas coisinhas, ver o por do sol(um sonhozinho que tive com você) e ouvir músicas."
            +"Basicamente é isso, saudades e estou ansioso para poder te ver de novo 💞💌";

const sairCafe="Poiiiiss ééé, sei que você não gosta de café, porem quando fui nesta cafeteria eles não vendem só café, "
            +"tem varias tortinhas e comidas que podemos pedir lá e é um lugar super confortavel e aconchegante."
            +"Depois podemos ir na pracinha do lado do IF ou mesmo na estação, fircar conversando, dando uma volta na linha ou até mesmo tomar um sorvetinho kkkk "
            +"e procurando um lugarzinho pra gente poder ver o por do sol caso ainda esteja acontecendo kkkkkk 🍪⛅";

const sairCinema="Dii novooo, sei que a gente já foi no cinema uma vez então não seria algo muito novo, porem caso esteja passando algo que você queira ver podemos ir,"
            +" adoraria poder ver um filme agarradinho no seu braço. Depois podemos conversar sobre o filme, beber alguma coisa em algum barzinho(caso esteja aberto 😭)."
            +""
            +"OBS:Caso se sinta confortavel eu não teria problema nenhum em ver um filme com você aqui em casa(prometo que eu super vou te respeitar e você ainda conheceria o pessoal daqui de casa kkkkk)";
            

const escolhaIF = document.querySelector("#irIF") as HTMLInputElement;
const escolhaCafe = document.querySelector("#irCafe") as HTMLInputElement;
const escolhaCinema = document.querySelector("#irFilme") as HTMLInputElement;

let textoIF = document.querySelector("#textIF") as HTMLInputElement;
let textoCafe = document.querySelector("#textCafe") as HTMLInputElement;
let textoCinema = document.querySelector("#textFilme") as HTMLInputElement;

if (botaoNao) {
    const foge = (): void => {
        botaoNao.style.position = "absolute";

        //Tamanho da tela
        const larguraTela: number = window.innerWidth - 150;
        const alturaTela: number = window.innerHeight - 50;

        //Calcula nova posição
        const xAleatorio: number = Math.floor(Math.random() * larguraTela);
        const yAleatorio: number = Math.floor(Math.random() * alturaTela);

        botaoNao.style.left = `${xAleatorio}px`;
        botaoNao.style.top = `${yAleatorio}px`;
    };

    botaoNao.addEventListener("mouseover", foge);

    //Para celular
    botaoNao.addEventListener("touchstart", (evento: TouchEvent): void => {
        evento.preventDefault(); 
        foge();
    });

    //Caso consiga clicar
    botaoNao.addEventListener("click", foge);
}

function acertoo(): void{
    if (botaoSim && sessao1 && sessao2) {
        sessao1.style.display = "none";
        sessao2.style.display = "block";
    }   
}

function decisao(escolha: string){
    textoIF.textContent="";
    textoCafe.textContent="";
    textoCinema.textContent="";

    if(escolha === escolhaIF.value){
        textoIF.textContent = sairIF;
        convite="Vamos no IF dia ";
    }else{
        if(escolha === escolhaCafe.value){
            textoCafe.textContent = sairCafe;
            convite="Vamos tomar \"\"\"\"cafe\"\"\"\" dia  ";
        }else{
            if(escolha === escolhaCinema.value){
                textoCinema.textContent = sairCinema;
                convite="Vamos ao cineminha diaaaaaaaa ";
            }
        }
    }
}

function abreCalendario(): void {
    let dataSelecionada;
    const inputData = document.createElement("input");
    inputData.type = "date";
    
    inputData.style.position = "absolute";
    inputData.style.opacity = "0";
    inputData.style.pointerEvents = "none";


    inputData.addEventListener("change", () => {
        dataSelecionada = inputData.value;

        if (dataSelecionada) {
            preparaConvite(dataSelecionada);
            inputData.remove();

            limpaSessao2();
            finaliza.style.display = "block"; 
        }
    });

    document.body.appendChild(inputData);
    
    if (typeof inputData.showPicker === "function") {
        inputData.showPicker();
    } else {
        inputData.click();
    }
}

function limpaSessao2(){
    sessao2.style.display="none";
}

function obterTexto(mensagem: string): string | null {
    const textoDigitado = prompt(mensagem);
    return textoDigitado; 
}

function preparaConvite(dataSelecionada: string){
    let mensagemAdicionada = obterTexto("Quer escrever algo a mais meu bem? 🌷");
    convite += dataSelecionada + "\n" + mensagemAdicionada;
}

const telefone: string = "5532998346992"; 

function enviarMensagem(): void {
    // O encodeURIComponent garante a conversão segura de espaços e acentos para a URL
    const mensagemFormatada: string = encodeURIComponent(convite);
    
    // Montagem da URL usando Template Literals
    const linkWhatsapp: string = `https://wa.me/${telefone}?text=${mensagemFormatada}`;
    
    // Abre a URL em uma nova aba do navegador
    window.open(linkWhatsapp, "_blank");
}