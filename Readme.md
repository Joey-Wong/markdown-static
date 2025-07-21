# markdown-static

## [DEMO](https://blog.yasol.cc)

### Node.js
#### Install
```Bash
npm install markdown-static
```

#### Ready
* mkdir assets,markdown
```Bash
/data
|-- assets
|   |-- 1.png
|-- markdown
    |-- test.md
```

* `test.md` content
```markdown
# test

## htllo

* 123

![img](/assets/1.png)
```


#### API
```JavaScript
const markdownStatic = require("markdown-static");
markdownStatic({
  rootDir: "/data", // must
  delayMS: 5 * 1000, // default 5s
  appServerPort: 3000, // appServerPort, default 3000
  staticServerPort: 3001, // staticServerPort, default 3001
  markdownServerPort: 3002, // markdownServerPort, default 3002
});
```

* visit
![img](https://raw.githubusercontent.com/Joey-Wong/markdown-static/HEAD/1.png)
![img](https://raw.githubusercontent.com/Joey-Wong/markdown-static/HEAD/2.png)

### [Docker](https://hub.docker.com/r/dockerjoeyy/markdown-static)
* docker-compose.yml
```yml
version: '3'
services:
  markdown-static:
    restart: always
    image: dockerjoeyy/markdown-static:latest
    container_name: markdown-static
    ports:
      - "3000:3000"
    environment:
      - LANG="en_US.UTF-8"
    volumes:
      - /data:/data
```

* run
```Bash
docker-compose up -d
```

### Donate
* buy me a coffee.
![img](https://raw.githubusercontent.com/Joey-Wong/markdown-static/HEAD/donate.png)