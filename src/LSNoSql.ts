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

export class LSNoSql {
    private document;
    constructor(document: LSDocument) {
        this.document = document;
    }

    public Query = {
        Select: (query: {
            from: string,
            where?: object
        }) => {
            this.document.DocumentPath(query.from)
        }
    };
}