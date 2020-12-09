import { LSDocument } from "lavastore";

/*
        88b 88  dP"Yb    .dP"Y8  dP"Yb  88
        88Yb88 dP   Yb   `Ybo." dP   Yb 88
        88 Y88 Yb   dP   o.`Y8b Yb b dP 88  .o
        88  Y8  YbodP    8bodP'  `"YoYo 88ood8

        Extension by William Rågstad.
        2020-12-08

        API: https://jsstore.net/tutorial/get-started/
*/

class LSQL {
    private document;
    constructor(document: LSDocument) {
        this.document = document;
    }

    public Select(query: {
        from: string,
        where?: object
    }) {
        const results: LSDocument[] = [];
        const documents = Object.values(this.document.CollectionPath(query.from).documents);
        const whereFields = Object.entries(query.where ?? {});
        for (let i = 0; i < documents.length; i++) {
            const d = documents[i];
            if (query.where) {
                const dFields = d.Get() as Object;
                if (whereFields.every(([key, val]: [string, any]) => key in dFields && (dFields as any)[key] === val)) results.push(d);
            }
            else results.push(d);
        }
        return results;
    }
}

export default LSQL;