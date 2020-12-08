# LavaStore NoSQL
 [LavaStore](https://www.npmjs.com/package/lavastore) NoSQL extension for performing database operation



## Install

LavaStore NoSQL can be installed using npm.

```bash
npm i lavastore-nosql
```

View the project on [NPM](https://www.npmjs.com/package/lavastore-nosql) or [GitHub](https://github.com/WilliamRagstad/LavaStore-nosql).



## Examples

Below is an example of an app using the LavaStore NoSQL extension.

```typescript
import LavaStore from 'lavastore';
import LSNoSql from 'lavastore-nosql';

const app = new LavaStore("app");
app.SetPath("messages/hello", {
    id: 0,
    value: "Hello, world!"
});
const nosql = new LSNoSql(app);

const results = nosql.Select({
    from: "messages",
    where: {
        id: 0
    }
});
// results = [LSDocument { id: 0, value: "Hello, world!" }]
```

