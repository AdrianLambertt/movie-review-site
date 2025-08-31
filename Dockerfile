# ---- Build stage ----
FROM node AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Build production code
RUN npm run build

# ---- Run stage ----
FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

# NO SSL as of current
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]