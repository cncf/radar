FROM node:14.5-slim

# Most of the packages below are necessary for puppeteer/chromium.
# These won't be necessary once we can use Sharp to take screenshots but that's blocked by: https://gitlab.gnome.org/GNOME/librsvg/-/issues/414
RUN apt-get update && apt-get install -y fontconfig libglib2.0-0 libnss3 libxrandr2 libatk-bridge2.0-0 libx11-xcb1 libxcb-dri3-0 libxcomposite1 libxcursor1 libxdamage1 libcups2 libdrm2 libgbm1 libasound2 libpangocairo-1.0-0 libxss1 libgtk-3-0

WORKDIR /project

COPY package.json .
COPY yarn.lock .

RUN yarn install

CMD ["yarn", "dev"]
