# LavaStore Query Language
 [LavaStore](https://www.npmjs.com/package/lavastore) extension for performing local database operations.



## Install

LavaStore QL can be installed using npm.

```bash
npm i lavastore-ql
```

View the project on [NPM](https://www.npmjs.com/package/lavastore-ql) or [GitHub](https://github.com/WilliamRagstad/LavaStore-ql).



## Examples

Below is an example of an app using the LavaStore QL extension.

```typescript
import LavaStore from 'lavastore';
import LSQL from 'lavastore-ql';

const app = new LavaStore("app");
app.SetPath("messages/hello", {
    id: 0,
    value: "Hello, world!"
});
const q = new LSQL(app);

const results = q.Select({
    from: "messages",
    where: {
        id: 0
    }
});
/* results = [LSDocument {
     id: "hello",
     fields: { id: 0, value: "Hello, world!" },
     collections: {}
   }] */
```

