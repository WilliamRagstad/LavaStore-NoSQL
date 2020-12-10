/*
    88     .dP"Y8  dP"Yb  88
    88     `Ybo." dP   Yb 88
    88  .o o.`Y8b Yb b dP 88  .o
    88ood8 8bodP'  `"YoYo 88ood8

    Extension by William Rågstad.
    2020-12-08

    API inspired by: https://jsstore.net/tutorial/get-started/
    and Run method by: https://github.com/ujjwalguptaofficial/sqlweb
*/

import { LSDocument } from "lavastore";

class LSQL {
    private document;
    private newID = () => '_' + Math.random().toString(36).slice(2);

    constructor(document: LSDocument) {
        this.document = document;
    }

    /**
     * Select documents from collection.
     * @param query The select details object containing a path to the collection to select every document where a set of attributes match.
     * @returns Matched documents array.
     */
    public Select(query: {
        from: string,
        where?: object,
        limit?: number
    }) {
        const documents = Object.values(this.document.CollectionPath(query.from).documents);
        if (query.where) {
            const results: LSDocument[] = [];
            const whereFields = Object.entries(query.where);
            documents.forEach(d => {
                if (query.limit && results.length >= query.limit) return;
                const dFields = d.Get() as Object;
                if (whereFields.every(([key, val]: [string, any]) => key in dFields && (dFields as any)[key] === val)) results.push(d);
            })
            return results;
        }
        else return documents;
    }

    /**
     * Insert a document to a collection.
     * @param query The insert details object containing a path to the collection a new document shall be inserted or the raw data. If a document value is provided, data will be discarded. Otherwise a new document with the provided data will be generated with a random id.
     * @returns true if successful.
     */
    public Insert(query: {
        into: string,
        document?: LSDocument,
        data?: object
    }) {
        const document = query.document ?? new LSDocument(this.newID(), query.data);
        const collection = this.document.CollectionPath(query.into);
        if (collection.Contains(document.id)) {
            console.warn(`Collection ${collection.id} already contains a document with the id ${document.id}.`)
            return false;
        }
        else collection.Add(document);
        return true;
    }

    /**
     * Update documents in a collection where a set of attributes match.
     * @param query The update details object containing a path to a collection in which documents shall be updated.
     * @returns true if successful.
     */
    public Update(query: {
        in: string,
        where?: object,
        set?: object
    }) {
        this.Select({
            from: query.in,
            where: query.where
        }).forEach(document => {
            document.Set({
                ...document.Get(),
                ...query.set
            })
        })
    }

    /**
     * Delete documents from a collection where a set of attributes match.
     * @param query The update details object containing a path to a collection in which documents shall be updated.
     * @returns number of successful deletions.
     */
    public Delete(query: {
        from: string,
        where?: object,
        limit?: number
    }) {
        let count = 0;
        this.Select(query).forEach(d => ++count && delete (d.parent as any)[d.id]);
        return count;
    }

    private parseSQL = (query: string): {
        api: Extract<keyof LSQL, string>,
        query: object
    } => {
        const result = {
            api: 'undefined' as Extract<keyof LSQL, string>,
            query: {} as any
        };

        query = query.trim();
        function peek(matchFunc: ((query: string) => string)) {
            const match = matchFunc(query);
            if (!query.startsWith(match)) throw new Error("Invalid order! Match must target start of query.");
            return match;
        }
        function consume(matchFunc: ((query: string) => string)) {
            const match = peek(matchFunc);
            query = query.replace(match, '').trimStart();
            return match;
        }
        const peekNext = () => peek(q => q.split(' ')[0]);
        const nextToken = () => consume(q => q.split(' ')[0]);

        // Parse action
        const action = nextToken().toLowerCase();
        let actionFound = false;
        for (var member in this) {
            if (member.toLowerCase() === action) {
                if (typeof this[member] == "function") { // Methods only
                    result.api = member as Extract<keyof LSQL, string>;
                    actionFound = true;

                    if (peekNext() === '*') nextToken(); // Throw away next token

                    // Special cases where a collection name is provided immediately after action
                    if (action === 'update') result.query.in = nextToken();
                }
            }
        }
        if (!actionFound) throw new Error(`Action '${action}' is not valid or yet implemented in LSQL.`);

        const comparisonOperators = ['=', '<', '>', '<=', '>=', '!='];
        const castToType = (value: string): any => !isNaN(parseFloat(value)) ? Number(value) : (() => { try { return JSON.parse(value.replaceAll('\'', '')) } catch { return value.replaceAll('\'', '') } })()
        // Parse query attributes
        let token = nextToken();
        while (token) {
            // Parse attribute pair: 'FROM table_name'
            const key = token.toLowerCase();
            switch (key) {
                case 'where':
                    let n = peekNext();
                    let fields = {};
                    while (n) {
                        if (!comparisonOperators.some(o => n.includes(o))) break;
                        nextToken(); // consume it
                        const attr = n.trim().split('=');
                        fields = {
                            ...fields,
                            [attr[0]]: [castToType(attr[1])]
                        }
                        if (peekNext() !== '&&') break;
                        nextToken(); // Throw away &&
                        n = peekNext();
                    }
                    result.query[key] = fields;
                default:
                    result.query[key] = nextToken();
                    break;
            }
            token = nextToken();
        }

        return result;
    }

    /**
     * Run SQL formatted queries
     * @param query SQL. Read more about the query syntax here: https://github.com/ujjwalguptaofficial/sqlweb/wiki
     */
    public Run(query: string): any {
        const result = this.parseSQL(query);
        return (this as any)[result.api](result.query);
    }
}

export default LSQL;