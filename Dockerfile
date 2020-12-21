# Stage 1 - the build process
FROM node:latest as build-deps
WORKDIR /usr/
COPY . ./
RUN npm install -g gatsby-cli
RUN npm install
RUN gatsby build

# Stage 2 - the production environment
FROM nginx:stable-alpine
COPY ./nginx/site.conf /etc/nginx/conf.d/default.conf
COPY --from=build-deps /usr/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]