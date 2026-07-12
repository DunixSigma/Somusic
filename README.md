# Somusic - Discord Music Bot

Um bot de musica poderoso para Discord construido com Discord.js e Kazagumo.

## Recursos

- 🎵 Reproducao de musica de alta qualidade
- 📝 Sistema de fila completo
- ❤️ Sistema de favoritos
- 📋 Gerenciamento de playlists
- 🔊 Controle de volume
- 🔁 Modos de loop
- 🎚️ Filtros de audio avancados
- 📚 Historico de musicas tocadas
- 🎤 Suporte a YouTube, Spotify e SoundCloud
- 💾 Banco de dados SQLite
- 📊 Painel permanente de controle

## Requisitos

- Node.js 18.0.0 ou superior
- Lavalink server (para reproducao de musica)
- Discord Bot Token
- SQLite3

## Instalacao

1. Clone o repositorio:
```bash
git clone https://github.com/DunixSigma/Somusic.git
cd Somusic
```

2. Instale as dependencias:
```bash
npm install
```

3. Configure o arquivo `.env`:
```bash
cp .env.example .env
```

4. Edite o `.env` com suas configuracoes

5. Inicie o bot:
```bash
npm start
```

## Configuracao do Lavalink

### Docker

```bash
docker run -d -p 2333:2333 --name lavalink fredboat/lavalink
```

### Manual

Baixe em: https://github.com/lavalink-devs/Lavalink/releases

## Configuracoes do Bot

1. Acesse: https://discord.com/developers/applications
2. Crie uma nova aplicacao
3. Na secao "Bot", copie o token
4. Em "OAuth2" > "URL Generator", selecione:
   - Scopes: `bot`, `applications.commands`
   - Permissions: `Administrator` (ou permissoes especificas)
5. Use a URL gerada para adicionar o bot ao seu servidor

## Comandos

### Musica
- `/play <musica>` - Toca uma musica
- `/pause` - Pausa a musica
- `/resume` - Retoma a musica
- `/skip` - Pula para a proxima
- `/stop` - Para a reproducao
- `/queue [pagina]` - Mostra a fila
- `/nowplaying` - Musica atual
- `/seek <segundos>` - Avanca/retrocede

### Controle
- `/volume <nivel>` - Altera volume (0-100)
- `/loop <tipo>` - Loop (off/track/queue)
- `/shuffle` - Embaralha a fila
- `/remove <posicao>` - Remove da fila
- `/move <de> <para>` - Move na fila
- `/clearqueue` - Limpa a fila

### Sistema
- `/favorite` - Adiciona aos favoritos
- `/history` - Seu historico
- `/playlist` - Gerencia playlists
- `/lyrics` - Letras da musica
- `/filter <tipo>` - Aplica filtros
- `/setup` - Configura painel permanente
- `/help` - Ajuda

## Estrutura do Projeto

```
Somusic/
├── src/
│   ├── commands/          # Comandos slash
│   ├── events/            # Eventos do bot
│   ├── buttons/           # Manipuladores de botoes
│   ├── modals/            # Manipuladores de modals
│   ├── selectMenus/       # Manipuladores de menus
│   ├── database/          # Sistema de banco de dados
│   ├── music/             # Sistema de musica
│   ├── utils/             # Funcoes utilitarias
│   ├── logs/              # Sistema de logs
│   ├── handlers/          # Handlers e carregadores
│   └── index.js           # Arquivo principal
├── data/                  # Dados do banco de dados
├── logs/                  # Arquivos de log
├── config.js              # Configuracoes
├── package.json           # Dependencias
└── .env                   # Variaveis de ambiente
```

## Variaveis de Ambiente

```env
# Discord
DISCORD_TOKEN=seu_token_aqui
CLIENT_ID=seu_client_id_aqui
PREFIX=!

# Lavalink
LAVALINK_HOST=localhost
LAVALINK_PORT=2333
LAVALINK_PASSWORD=youshallnotpass
LAVALINK_SECURE=false

# Debug
DEBUG=false
```

## Dependencias

- discord.js
- kazagumo
- shoukaku
- axios
- dotenv
- chalk
- moment
- sqlite3

## Licenca

MIT License - Veja LICENSE para detalhes

## Suporte

Para suporte, abra uma issue no GitHub ou entre em contato

## Autores

- DunixSigma

## Agradecimentos

- Discord.js
- Kazagumo
- Lavalink
