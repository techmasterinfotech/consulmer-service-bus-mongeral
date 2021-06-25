FROM node:14

FROM node:14

# Create app directory
WORKDIR /usr/src/consulmer-service-bus-mongeral


ENV AWS_ACCESS_KEY_ID=AKIAUGEWGSASQJHBCYOD
ENV AWS_SECRET_ACCESS_KEY=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

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

CMD [ "node", "index.js" ]
