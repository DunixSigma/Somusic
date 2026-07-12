# Somusic - Discord Music Bot

Um bot de música profissional para Discord construído com Discord.js v14, Kazagumo, Shoukaku e Lavalink. Totalmente modular, com interface moderna e features completas.

## 🎵 Recursos

- ✅ Reprodução de música de alta qualidade
- ✅ Sistema de fila completo
- ✅ Pesquisa em YouTube, Spotify e SoundCloud
- ✅ Converter Spotify automaticamente para YouTube
- ✅ Sistema de favoritos
- ✅ Playlists privadas
- ✅ Histórico de músicas
- ✅ Painel permanente com setup automático
- ✅ Controle de volume
- ✅ Modos de loop (track/fila)
- ✅ Shuffle
- ✅ Autoplay
- ✅ Filtros de áudio avançados
- ✅ Busca de letras
- ✅ Sistema DJ com permissões
- ✅ Dashboard em tempo real
- ✅ Banco de dados SQLite
- ✅ Logs profissionais
- ✅ Tratamento robusto de erros

## 📋 Requisitos

- Node.js 20.0.0 ou superior
- Lavalink server rodando
- Discord Bot Token
- SQLite3

## ⚡ Instalação Rápida

### 1. Clone o repositório
```bash
git clone https://github.com/DunixSigma/Somusic.git
cd Somusic
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o arquivo `.env`
```bash
cp .env.example .env
# Edite .env com suas credenciais
```

### 4. Configure o Lavalink

#### Usando Docker (Recomendado)
```bash
docker run -d \
  --name lavalink \
  -p 2333:2333 \
  -e JAVA_TOOL_OPTIONS="-Xmx512m" \
  fredboat/lavalink
```

#### Manualmente
1. Baixe em: https://github.com/lavalink-devs/Lavalink/releases
2. Instale Java 17+
3. Execute: `java -jar Lavalink.jar`

### 5. Inicie o bot
```bash
npm start          # Produção
npm run dev        # Desenvolvimento (com hot reload)
```

## 🔧 Configuração Discord

1. Acesse: https://discord.com/developers/applications
2. Crie uma nova aplicação
3. Em "Bot", clique "Add Bot"
4. Copie o token e adicione ao `.env` como `DISCORD_TOKEN`
5. Em "OAuth2" → "URL Generator":
   - Scopes: `bot`, `applications.commands`
   - Permissions: `Administrator` (ou veja permissões específicas abaixo)
6. Use a URL gerada para adicionar o bot ao servidor

### Permissões Recomendadas
```
- Send Messages
- Send Messages in Threads
- Embed Links
- Attach Files
- Add Reactions
- Use External Emoji
- Connect
- Speak
- Manage Messages
- Manage Channels
```

## 📖 Comandos Slash

### 🎵 Música
| Comando | Descrição |
|---------|----------|
| `/play [música]` | Toca uma música do YouTube/Spotify/SoundCloud |
| `/pause` | Pausa a música atual |
| `/resume` | Retoma a música |
| `/skip [quantidade]` | Pula para a próxima música |
| `/stop` | Para a reprodução |
| `/queue [página]` | Mostra a fila de músicas |
| `/nowplaying` | Mostra a música atual |
| `/seek <segundos>` | Avança/retrocede na música |
| `/previous` | Toca a música anterior |
| `/remove <posição>` | Remove uma música da fila |
| `/move <de> <para>` | Move uma música na fila |
| `/clearqueue` | Limpa toda a fila |

### 🎛️ Controle
| Comando | Descrição |
|---------|----------|
| `/volume <0-100>` | Define o volume |
| `/loop <off\|track\|queue>` | Define modo de repetição |
| `/shuffle` | Embaralha a fila |
| `/autoplay <on\|off>` | Ativa/desativa autoplay |
| `/filter <filtro>` | Aplica filtros de áudio |
| `/removefilter` | Remove todos os filtros |

### ❤️ Favoritos
| Comando | Descrição |
|---------|----------|
| `/favorite add` | Adiciona aos favoritos |
| `/favorite list` | Lista seus favoritos |
| `/favorite remove <id>` | Remove um favorito |
| `/favorite play <id>` | Toca um favorito |

### 📋 Playlists
| Comando | Descrição |
|---------|----------|
| `/playlist create <nome>` | Cria uma playlist |
| `/playlist list` | Lista suas playlists |
| `/playlist add <id> <música>` | Adiciona música à playlist |
| `/playlist remove <id> <música>` | Remove música da playlist |
| `/playlist play <id>` | Toca uma playlist |
| `/playlist delete <id>` | Deleta uma playlist |

### 📚 Histórico & Info
| Comando | Descrição |
|---------|----------|
| `/history` | Mostra seu histórico |
| `/lyrics` | Mostra letras da música atual |
| `/stats` | Estatísticas do bot |
| `/ping` | Latência do bot |

### ⚙️ Sistema
| Comando | Descrição |
|---------|----------|
| `/setup` | Configura painel permanente |
| `/dj <add\|remove\|list>` | Gerencia DJ roles |
| `/help` | Menu de ajuda |

## 🎨 Painel Permanente

O comando `/setup` cria um painel interativo e permanente no canal escolhido:

**Características:**
- Escolha o canal via menu
- Atualiza em tempo real
- Mostra capa, nome, autor, duração
- Barra de progresso animada
- Botões: Play, Pause, Skip, Stop, Previous, Shuffle, Loop, Volume, Queue, Favoritos, Playlist, Filtros, Pesquisar
- Fixado automaticamente
- Recreiado se deletado
- Persiste após reinicializações

## 📂 Estrutura do Projeto

```
Somusic/
├── src/
│   ├── commands/          # Comandos Slash
│   │   ├── music/         # Comandos de música
│   │   ├── favorite/      # Comandos de favoritos
│   │   ├── playlist/      # Comandos de playlist
│   │   ├── utility/       # Comandos de utilidade
│   │   └── admin/         # Comandos administrativos
│   ├── events/            # Eventos Discord & Kazagumo
│   │   ├── discord/       # Eventos do Discord
│   │   └── music/         # Eventos de música
│   ├── buttons/           # Manipuladores de botões
│   ├── modals/            # Manipuladores de modals
│   ├── selectMenus/       # Manipuladores de menus
│   ├── handlers/          # Carregadores automáticos
│   ├── database/          # Sistema SQLite
│   │   ├── schemas/       # Esquemas de tabelas
│   │   ├── repositories/  # Acesso aos dados
│   │   └── database.js    # Gerenciador principal
│   ├── music/             # Sistema de música
│   │   ├── player.js      # Gerenciador de reprodução
│   │   ├── queue.js       # Gerenciador de fila
│   │   ├── spotify.js     # Integração Spotify
│   │   └── filters.js     # Gerenciador de filtros
│   ├── utils/             # Funções utilitárias
│   │   ├── embed.js       # Construtor de embeds
│   │   ├── keyboard.js    # Construtor de componentes
│   │   ├── formatter.js   # Formatação de texto
│   │   └── validators.js  # Validações
│   ├── logs/              # Sistema de logs
│   ├── types/             # Definições de tipos
│   └── index.js           # Arquivo principal
├── data/                  # Banco de dados SQLite
├── logs/                  # Arquivos de log
├── config.js              # Configurações
├── package.json           # Dependências
├── .env.example           # Exemplo de variáveis
├── .gitignore             # Git ignore
└── README.md              # Este arquivo
```

## 🔌 Variáveis de Ambiente

```env
# Discord
DISCORD_TOKEN=seu_token_aqui
CLIENT_ID=seu_client_id
GUILD_ID=seu_guild_id (opcional)
OWNER_ID=seu_user_id
PREFIX=!

# Lavalink
LAVALINK_HOST=localhost
LAVALINK_PORT=2333
LAVALINK_PASSWORD=youshallnotpass
LAVALINK_SECURE=false

# Spotify
SPOTIFY_CLIENT_ID=seu_id
SPOTIFY_CLIENT_SECRET=seu_secret

# Genius (Letras)
GENIUS_TOKEN=seu_token

# Debug
DEBUG=false
```

## 📦 Dependências

- **discord.js** - API Discord
- **kazagumo** - Gerenciador de música
- **shoukaku** - Cliente Lavalink
- **dotenv** - Variáveis de ambiente
- **sqlite3** - Banco de dados
- **axios** - Requisições HTTP
- **chalk** - Colores em console
- **moment** - Formatação de tempo

## 🚀 Scripts

```bash
npm start          # Inicia em produção
npm run dev        # Inicia com hot reload
```

## 📊 Database

SQLite com tabelas para:
- Configurações do servidor
- Painel permanente
- Favoritos do usuário
- Playlists do usuário
- Histórico de músicas
- Configurações de volume/loop
- DJ roles
- Filtros aplicados

## 🐛 Logs

Arquivos de log automáticos em `./logs/`:
- `bot.log` - Eventos principais
- `music.log` - Eventos de música
- `error.log` - Erros
- `database.log` - Operações DB

## 🔐 Permissões

- **Owner**: Acesso total
- **DJ Role**: Gerenciar música
- **Server Members**: Usar comandos básicos

## ❓ Solução de Problemas

### Bot não conecta ao Lavalink
1. Verifique se Lavalink está rodando
2. Verifique HOST, PORT e PASSWORD em `.env`
3. Veja logs para erros de conexão

### Comando não funciona
1. Verifique permissões do bot
2. Verifique se bot está no servidor
3. Veja logs de erro

### Música não toca
1. Verifique conexão ao canal de voz
2. Verifique se Lavalink está ativo
3. Veja logs de música

## 📝 Licença

MIT License - Veja LICENSE para detalhes

## 💬 Suporte

Para suporte, abra uma issue no GitHub

## 👤 Autor

- **DunixSigma** - [GitHub](https://github.com/DunixSigma)

## 🙏 Agradecimentos

- Discord.js team
- Kazagumo developers
- Lavalink team
- Comunidade Discord

---

**Desenvolvido com ❤️ por DunixSigma**
