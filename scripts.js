/*
Variável - pedaço de memória que armazena um valor

let - palavra reservada para criar uma variável
nomeDaVariavel - nome que damos para a variável
= - operador de atribuição, usado para atribuir um valor a uma variável
valor - o dado que queremos armazenar na variável

Algoritimo - receita do bolo
Logica de programação - forma de fazer o bolo

[] Saber quem é o botão
[] Saber oque fazer quando clicar no botão
[] saber quem é o textarea
[] pegar oq tem dentro dele
[] enviar para a ia
[] pegar a resposta da ia e colocar na tela

// HTML = document
// selecionar algo = querySelector("seletorCSS")
// quem? 
// apelido para classes - classes(class) = .
// fetch -  ferramenta do js para se comunicar com o servidor
*/

let botao = document.querySelector(".botao-gerar")
let chave = "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"
let endereco = "https://api.groq.com/openai/v1/chat/completions"

//vizinho curioso (addEventListener) - executa o evento de clique//

botao.addEventListener("click", gerarCodigo)

//função - usada para executar um bloco de código quando o evento ocorre//

    async function gerarCodigo()
    {
        let textarea = document.querySelector(".caixa-texto").value
        console.log(textarea)
        let blocoCodigo = document.querySelector(".bloco-codigo")
        let resultadoCodigo = document.querySelector(".resultado-codigo")
        let resposta = await fetch(endereco, 
            {
                method: "POST",
                headers:{
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + chave
                        }
                ,
                body: JSON.stringify
                (
                    {
                        model: "llama-3.3-70b-versatile",
                        messages:  
                        [
                            { 
                                role: "system",
                                content: "Você é um gerador de código HTML e CSS. Responda SOMENTE com código puro. NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga EXATAMENTE o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate no @keyframes. Se pedir algo piscando, use opacity no @keyframes. Se pedir algo se movendo, use translateX ou translateY no @keyframes. Se pedir algo com gradiente, use background: linear-gradient. Se pedir algo com borda arredondada, use border-radius. Se pedir algo com sombra, use box-shadow. Se pedir algo com fonte personalizada, use @font-face e font-family. Se pedir algo responsivo, use media queries. Se pedir algo com animação, use @keyframes e animation. Se pedir algo com flexbox, use display: flex e as propriedades relacionadas. Se pedir algo com grid, use display: grid e as propriedades relacionadas."
                            },
                            {
                                role: "user",
                                content: textarea
                            }
                        ]
                    }
                )
             }
        ) 
        
        let dados = await resposta.json()
        let resultado = dados.choices[0].message.content

        blocoCodigo.textContent = resultado
        resultadoCodigo.srcdoc = resultado
    }