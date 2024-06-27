# Dockerfile
FROM node:20.13.1

#Set the working directory
WORKDIR /app

#Copy package.json and package-lockp.json
COPY package*.json ./

#Install dependencies
RUN npm install

#Copy the rest of the application code
COPY . .

#Build the application
#RUN npm run build

#Expose the application port
EXPOSE 5173

#Start the application
CMD ["npm", "run", "dev"]