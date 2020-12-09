import { LSDocument } from "lavastore";
declare class LSQL {
    private document;
    constructor(document: LSDocument);
    Select(query: {
        from: string;
        where?: object;
    }): LSDocument[];
}
export default LSQL;
