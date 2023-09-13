FROM nginx:latest

# INSTALL DEPENDINCES
RUN apt install openssl -yq 

# CREATE SSL CERTIFICATES
RUN openssl req -x509 -nodes -days 365 \
    -newkey rsa:2048 -keyout /etc/ssl/private/server.key \
    -out /etc/ssl/certs/server.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/OU=Organizational Unit/CN=Common Name"

COPY ./config/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
