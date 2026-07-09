# Estágio 1: Compilar a aplicação React
FROM node:22-alpine AS build
WORKDIR /app

# Copia os arquivos de dependências primeiro (aproveita o cache do Docker)
COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos do projeto e gera o build
COPY . .
RUN npm run build

# Estágio 2: Servir os arquivos estáticos com Nginx
FROM nginx:stable-alpine

# Copia os arquivos buildados do estágio anterior para o diretório do Nginx
# Nota: Se você usa Vite, substitua '/app/build' por '/app/dist'
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta padrão do servidor web
EXPOSE 80

# Inicia o Nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]
