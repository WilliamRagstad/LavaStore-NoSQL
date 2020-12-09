import { LSDocument } from "lavastore";
declare class LSQL {
    private document;
    private newID;
    constructor(document: LSDocument);
    Select(query: {
        from: string;
        where?: object;
        limit?: number;
    }): LSDocument[];
    Insert(query: {
        to: string;
        document?: LSDocument;
        data?: object;
    }): boolean;
    Update(query: {
        in: string;
        where?: object;
        set?: object;
    }): void;
    Delete(query: {
        from: string;
        where?: object;
        limit?: number;
    }): number;
}
export default LSQL;
