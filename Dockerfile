# Use uma imagem base do Node.js
FROM node:20

# Cria o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json para o diretório de trabalho
COPY backend/package.json ./backend/package.json

# Define o diretório de trabalho para o backend
WORKDIR /app/backend

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY backend .

# Gera os artefatos do Prisma
RUN npx prisma generate

# Compila a aplicação
RUN npm run build

# Exponha a porta em que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]
