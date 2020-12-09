import { LSDocument } from "lavastore";
class LSQL {
    constructor(document) {
        this.newID = () => '_' + Math.random().toString(36).slice(2);
        this.document = document;
    }
    Select(query) {
        const documents = Object.values(this.document.CollectionPath(query.from).documents);
        if (query.where) {
            const results = [];
            const whereFields = Object.entries(query.where);
            documents.forEach(d => {
                if (query.limit && results.length >= query.limit)
                    return;
                const dFields = d.Get();
                if (whereFields.every(([key, val]) => key in dFields && dFields[key] === val))
                    results.push(d);
            });
            return results;
        }
        else
            return documents;
    }
    Insert(query) {
        const document = query.document ?? new LSDocument(this.newID(), query.data);
        const collection = this.document.CollectionPath(query.to);
        if (collection.Contains(document.id)) {
            console.warn(`Collection ${collection.id} already contains a document with the id ${document.id}.`);
            return false;
        }
        else
            collection.Add(document);
        return true;
    }
    Update(query) {
        this.Select({
            from: query.in,
            where: query.where
        }).forEach(document => {
            document.Set({
                ...document.Get(),
                ...query.set
            });
        });
    }
    Delete(query) {
        let count = 0;
        this.Select(query).forEach(d => ++count && delete d.parent[d.id]);
        return count;
    }
}
export default LSQL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTFNRTC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9MU1FMLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVlBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFdkMsTUFBTSxJQUFJO0lBSU4sWUFBWSxRQUFvQjtRQUZ4QixVQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRzVELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFPTSxNQUFNLENBQUMsS0FJYjtRQUNHLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BGLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNiLE1BQU0sT0FBTyxHQUFpQixFQUFFLENBQUM7WUFDakMsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDbEIsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLEtBQUs7b0JBQUUsT0FBTztnQkFDekQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBWSxDQUFDO2dCQUNsQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQWdCLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxPQUFPLElBQUssT0FBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQztvQkFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNILENBQUMsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxPQUFPLENBQUM7U0FDbEI7O1lBQ0ksT0FBTyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQU9NLE1BQU0sQ0FBQyxLQUliO1FBQ0csTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxRCxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxVQUFVLENBQUMsRUFBRSw0Q0FBNEMsUUFBUSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDbkcsT0FBTyxLQUFLLENBQUM7U0FDaEI7O1lBQ0ksVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBT00sTUFBTSxDQUFDLEtBSWI7UUFDRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ1IsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ2QsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO1NBQ3JCLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbEIsUUFBUSxDQUFDLEdBQUcsQ0FBQztnQkFDVCxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2pCLEdBQUcsS0FBSyxDQUFDLEdBQUc7YUFDZixDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFPTSxNQUFNLENBQUMsS0FJYjtRQUNHLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLElBQUksT0FBUSxDQUFDLENBQUMsTUFBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNFLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FDSjtBQUVELGVBQWUsSUFBSSxDQUFDIn0=