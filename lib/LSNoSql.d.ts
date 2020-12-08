import { LSDocument } from "lavastore";
export declare class LSNoSql {
    private document;
    constructor(document: LSDocument);
    Query: {
        Select: (query: {
            from: string;
            where?: object;
        }) => void;
    };
}
