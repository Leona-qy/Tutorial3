# Ticket-To-Ride-Enhanced-Version

The link of the git repository is :https://github.com/Leona-qy/Tutorial3.git

The steps to execute the code are as following:

Start docker and Set Port 3000
---

```
docker run -p 3000:3000 -p 5000:5000 -p 8000:8000 -dit ubuntu:latest
apt update
```

Open VSCode and Start Up Project
---

```
apt install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install 10
nvm alias default 10
npm install -g npm@6
npm init
npm install express@4
```

Get the Git Repository
---
```
apt install git
git clone https://github.com/Leona-qy/Tutorial3.git
cd Tutorial3
```

JSX Transform
---
```
npm install --save-dev @babel/core@7 @babel/cli@7
npm install --save-dev @babel/preset-react@7
npx babel src --presets @babel/react --out-dir public
```

Start Express
---
```
node server/server.js
```


