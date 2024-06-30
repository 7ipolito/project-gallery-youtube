# Use uma imagem base do Node.js
FROM node:20

# Cria o diretório de trabalho dentro do contêiner
WORKDIR /app

RUN cd backend

COPY package.json ./
# Instala as dependências
RUN npm install

COPY . .

# Gera os artefatos do Prisma
RUN npx prisma generate

# Compila a aplicação
RUN npm run build

# Exponha a porta em que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]