FROM node:slim

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy binaries
COPY ./node-srv/ /usr/src/app/

# Install dependencies
RUN npm i --production

# Copy Angular code
COPY ./dist/ /usr/src/app/

# Environment variables
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

ARG COMMIT_ID
ENV COMMIT_ID ${COMMIT_ID}

ARG NG_OE_API_URL
ENV NG_OE_API_URL ${NG_OE_API_URL}

ARG PORT
ENV PORT ${PORT}

EXPOSE ${PORT}
CMD [ "npm", "start" ]
