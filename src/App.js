import React, { useState, useRef, useEffect } from "react";
import { Box, AppBar, Toolbar, Typography, TextField, Button } from "@mui/material";


// Componente Header: exibe o cabeçalho da aplicação com um título.
function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          ChatBot - Exclusivo para Gatos
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

// Componente ChatArea: exibe as mensagens do chat e rola automaticamente para a última mensagem.
function ChatArea({ messages }) {
  const chatEndRef = useRef(null); // Referência para o final do chat, usada para rolagem automática.

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });// Rola para o final suavemente.
  };

  useEffect(() => {
    scrollToBottom();  // Rola para o final sempre que novas mensagens são adicionadas.
  }, [messages]);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto", // Permite rolagem vertical para mensagens longas.
        padding: 2,
        backgroundColor: "#f5f5f5", // Cor de fundo do chat.
      }}
    >
      {messages.map((msg, index) => (
        <Box
          key={index}  // Chave única para cada mensagem 
          sx={{
            margin: 1,
            padding: "10px 15px",
            maxWidth: "75%",
            alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",   // Alinha mensagens do usuário à direita e do bot à esquerda.
            backgroundColor: msg.sender === "user" ? "#d1ffd6" : "#ffffff", // Cor de fundo diferente para mensagens do usuário e do bot.
            borderRadius: "12px", // Bordas arredondadas para as mensagens.
            boxShadow: 1,         // Sombra para destacar as mensagens.
          }}
        >
          {msg.text}  {/* Exibe o texto da mensagem */}
        </Box>
      ))}
      <div ref={chatEndRef} />     {/* Elemento vazio usado para rolar automaticamente para o final */}

    </Box>
  );
}
// Componente InputArea: contém o campo de entrada e o botão para enviar mensagens.
function InputArea({ userMessage, setUserMessage, handleSend }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 1,
        borderTop: "1px solid #ccc",   // Linha de separação entre a área de chat e o input.
      }}
    >
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Digite aqui (1, 2 ou 3)..." // Texto exibido como dica no campo de entrada.
        value={userMessage} // Valor do campo de entrada controlado pelo estado.
        onChange={(e) => setUserMessage(e.target.value)} // Atualiza o estado ao digitar.
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSend} // Envia a mensagem ao clicar no botão.
        sx={{ marginLeft: 1 }}
        disabled={!userMessage.trim()} // Desabilita o botão se o campo estiver vazio ou só com espaços.
      >
        Enviar
      </Button>
    </Box>
  );
}
// Componente principal App: gerencia o estado das mensagens e renderiza os componentes.
function App() {
  const [messages, setMessages] = useState([
     // Estado inicial com a primeira mensagem do bot.
    { sender: "bot", text: "Olá! Como posso ajudar você hoje? Escolha: 1, 2 ou 3." },
  ]);
  const [userMessage, setUserMessage] = useState(""); // Estado para a mensagem que o usuário está digitando.
// Função chamada ao enviar a mensagem.
  const handleSend = () => {
    if (userMessage.trim()) {
      // Verifica se a mensagem não está vazia.
      const newMessages = [
        ...messages,  // Mantém as mensagens anteriores.
        { sender: "user", text: userMessage }, // Adiciona a mensagem do usuário
        { sender: "bot", text: getBotResponse(userMessage) },// Adiciona a resposta do bot. 
      ];
      setMessages(newMessages); // Atualiza o estado das mensagens.
      setUserMessage(""); // Limpa o campo de entrada.
    }
  };
  // Função para obter a resposta do bot com base na mensagem do usuário.
  const getBotResponse = (message) => {
    switch (message.toLowerCase()) {  // Converte a mensagem para minúsculas para facilitar a comparação.
      case "1":
        return "Opção 1: Confira nossos produtos exclusivos para gatos!";
      case "2":
        return "Opção 2: Entre em contato conosco pelo telefone: (11) 9999-9999.";
      case "3":
        return "Opção 3: Acesse nosso site para mais informações!";
      default:
        return "Desculpe, não entendi. Escolha: 1, 2 ou 3."; // Resposta padrão para entradas inválidas.
      }
    }


  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />                         {/* Cabeçalho da aplicação */}
      <ChatArea messages={messages} />   {/* Área de chat exibindo as mensagens */}
      <InputArea
        userMessage={userMessage}         // Passa o estado da mensagem do usuário.
        setUserMessage={setUserMessage}   // Função para atualizar a mensagem do usuário.
        handleSend={handleSend}    
        />
     
    </Box>
 );
}

export default App;
