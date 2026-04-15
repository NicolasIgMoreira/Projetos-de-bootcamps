
let botao = document.querySelector(".botao-gerar")
let chave = "gsk_wRYY8TmMNfGmMyKKGFO1WGdyb3FYMItU0Q0rScHbb7hTeeZAP"
let endereco = "https://api.groq.com/openai/v1/chat/completions"

botao.addEventListener("click", gerarCodigo)

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
