# 🎵 Somusic - Professional Discord Music Bot

Um bot de música profissional para Discord, desenvolvido com Node.js, discord.js v14, Kazagumo, Shoukaku e Lavalink.

## 🚀 Características

### Sistema de Música
- ✅ Pesquisa por YouTube
- ✅ Pesquisa por Spotify (conversão automática para YouTube)
- ✅ Pesquisa por SoundCloud
- ✅ Suporte a Playlists
- ✅ Sistema de Fila (Queue)
- ✅ Comando Previous
- ✅ Replay de músicas
- ✅ Remoção de músicas
- ✅ Mover músicas na fila
- ✅ Limpar fila
- ✅ Shuffle
- ✅ Loop (Track/Fila)
- ✅ Autoplay
- ✅ Controle de Volume
- ✅ Seek (Avançar/Retroceder)
- ✅ Now Playing
- ✅ Letras de músicas
- ✅ Histórico de reprodução
- ✅ Favoritos
- ✅ Playlists privadas
- ✅ Sistema DJ
- ✅ Sistema de permissões

### Interface
- 🎨 Dashboard moderno e em tempo real
- 🎛️ Painel permanente configurável
- 🎵 Controles interativos com botões
- 📊 Capa da música, progresso, volume
- ⌚ Status do Lavalink em tempo real

### Funcionalidades Adicionais
- 📝 Sistema de logs completo
- 💾 Banco de dados SQLite
- 🔧 Tratamento de erros robusto
- 📦 Código totalmente modular
- 🎯 Comandos Slash modernos
- 🔐 Sistema de permissões
- 🌍 Suporte multi-idioma (Português)

## 📋 Pré-requisitos

- Node.js 20.0.0 ou superior
- npm ou yarn
- Lavalink configurado e rodando
- Bot Token do Discord
- Client ID do Discord

## 📥 Instalação

### 1. Clonar o Repositório
```bash
git clone https://github.com/DunixSigma/Somusic.git
cd Somusic
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:
```env
DISCORD_TOKEN=seu_token_aqui
DISCORD_CLIENT_ID=seu_client_id_aqui
LAVALINK_HOST=localhost
LAVALINK_PORT=2333
LAVALINK_PASSWORD=youshallnotpass
```

### 4. Executar o Bot
```bash
npm start
```

Para desenvolvimento com auto-reload:
```bash
npm run dev
```

## 🛠️ Estrutura de Pastas

```
Somusic/
├── src/
│   ├── index.js                 # Arquivo principal
│   ├── commands/               # Comandos Slash
│   ├── events/                 # Eventos Discord
│   ├── handlers/               # Gerenciadores
│   ├── buttons/                # Handlers de botões
│   ├── modals/                 # Handlers de modais
│   ├── selectMenus/            # Handlers de menus de seleção
│   ├── music/                  # Sistema de música
│   ├── database/               # Gerenciador de banco de dados
│   ├── utils/                  # Funções utilitárias
│   ├── types/                  # Definições de tipos
│   ├── assets/                 # Recursos (imagens, ícones)
│   └── logs/                   # Sistema de logs
├── data/
│   └── database.sqlite        # Banco de dados
├── logs/                       # Arquivos de log
├── config.js                   # Configurações
├── .env                        # Variáveis de ambiente
├── .env.example               # Exemplo de variáveis
├── .gitignore                 # Git ignore
├── package.json               # Dependências
└── README.md                  # Este arquivo
```

## ⚙️ Configuração do Lavalink

### Docker Compose (Recomendado)

Crie um arquivo `docker-compose.yml`:

```yaml
version: '3.8'

services:
  lavalink:
    image: lavalibs/lavalink:latest
    container_name: lavalink
    environment:
      - _JAVA_OPTIONS=-Xmx6G
    ports:
      - "2333:2333"
    volumes:
      - ./application.yml:/opt/Lavalink/application.yml
    restart: unless-stopped
```

E um arquivo `application.yml` com configurações do Lavalink.

## 🎮 Uso do Bot

### Setup do Painel

```
/setup
```

Configura o painel permanente de música em um canal à sua escolha.

### Comandos de Música

- `/play [música]` - Toca uma música
- `/pause` - Pausa a reprodução
- `/resume` - Retoma a reprodução
- `/skip` - Pula para a próxima música
- `/stop` - Para a reprodução
- `/queue` - Mostra a fila
- `/loop [type]` - Ativa loop (track/queue/off)
- `/shuffle` - Embaralha a fila
- `/volume [número]` - Altera o volume (0-100)
- `/nowplaying` - Mostra a música atual
- `/lyrics` - Mostra as letras
- `/history` - Mostra histórico
- `/favorite` - Adiciona aos favoritos
- `/playlist` - Gerencia playlists

## 🔐 Permissões Necessárias

O bot necessita das seguintes permissões:

- Conectar
- Falar
- Gerenciar Mensagens
- Incorporar Links
- Adicionar Reações

## 📝 Logs

Os logs são salvos em `logs/` com formato:
- `logs/info.log` - Informações gerais
- `logs/error.log` - Erros
- `logs/music.log` - Eventos de música

## 🤝 Suporte

Para reportar bugs ou solicitar funcionalidades, abra uma issue no repositório.

## 📄 Licença

MIT - Veja o arquivo LICENSE para detalhes.

## 👨‍💻 Autor

**DunixSigma** - [GitHub](https://github.com/DunixSigma)

---

**Desenvolvido com ❤️ para a comunidade Discord**
