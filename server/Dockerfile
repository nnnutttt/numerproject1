FROM node:18-alpine

WORKDIR /app
# สร้าง dir ที่อยู่ใน docker ที่ชื่อว่า app

COPY package.json ./  
# copy file packagejson หลังบ้านไปไว้ใน /app

RUN npm install
#เวลาคนอื่นจะรันเจคเรา ให้ใช้คำสั่งนี้เพื่อ install

COPY . .
# . = copy file ทั้งหมดใน server (แต่ต้องดู .dockerignore ว่าอิกนอร์ไรไว้บ้าง)
# .(2) = เอาที่ก้อปมาไปไว้ใน folder app

EXPOSE 4000
#port ที่จะออกไป (ของหลังบ้าน) port จริงๆ

CMD ["npm", "start"]