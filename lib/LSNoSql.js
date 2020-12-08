export class LSNoSql {
    constructor(document) {
        this.Query = {
            Select: (query) => {
                this.document.DocumentPath(query.from);
            }
        };
        this.document = document;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTFNOb1NxbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9MU05vU3FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWNBLE1BQU0sT0FBTyxPQUFPO0lBRWhCLFlBQVksUUFBb0I7UUFJekIsVUFBSyxHQUFHO1lBQ1gsTUFBTSxFQUFFLENBQUMsS0FHUixFQUFFLEVBQUU7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzFDLENBQUM7U0FDSixDQUFDO1FBVkUsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztDQVVKIn0=