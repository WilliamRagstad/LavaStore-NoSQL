/*
    88     .dP"Y8  dP"Yb  88
    88     `Ybo." dP   Yb 88
    88  .o o.`Y8b Yb b dP 88  .o
    88ood8 8bodP'  `"YoYo 88ood8

    Extension by William Rågstad.
    2020-12-08

    API inspired by: https://jsstore.net/tutorial/get-started/
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
        to: string,
        document?: LSDocument,
        data?: object
    }) {
        const document = query.document ?? new LSDocument(this.newID(), query.data);
        const collection = this.document.CollectionPath(query.to);
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
}

export default LSQL;