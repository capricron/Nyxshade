FROM ubuntu

WORKDIR /usr/app

# Menonaktifkan dialog pada instalasi paket
ARG DEBIAN_FRONTEND=noninteractive

COPY . .

RUN apt-get update && \
    apt-get install -y snapd && \
    RUN service snapd start && \
    snap install bun-js &&\
    # apt install -y curl &&\
    # apt install unzip \
    # apt-get install -y nodejs && \
    # apt-get install bun \
    # apt-get install -y \
    # nikto \
    # nmap && \
    bun install


# Menjalankan aplikasi Hono JS saat container dijalankan
CMD ["npm", "run" ,"dev"]
