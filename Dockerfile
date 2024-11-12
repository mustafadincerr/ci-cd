# Küçük boyutlu bir Node.js imajı olan Alpine tabanlı Node.js 16 imajını kullan
FROM node:16-alpine

# Çalışma dizinini oluştur ve ayarla
WORKDIR /usr/src/app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Gerekli paketleri yükle
RUN npm install

# Uygulama dosyalarını kopyala
COPY . .

# Uygulamanın çalışacağı portu belirt
EXPOSE 3000

# Uygulamayı başlat
CMD ["node", "app.js"]
