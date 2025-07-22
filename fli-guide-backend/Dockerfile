FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Make sure wait script is executable
RUN chmod +x wait-for.sh

EXPOSE 5025

# Use the wait script as the entrypoint
CMD ["./wait-for.sh"]
