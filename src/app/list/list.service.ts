import { Injectable } from "@angular/core";

import { List } from "./list.model";

@Injectable({
    providedIn: "root"
})
export class ListService {
    private lists = new Array<List>(
        { id: 1, name: "Twins", faction: "Rebels" },
        { id: 2, name: "Vader & Palps", faction: "Empire" }
    );

    getLists(): Array<List> {
        return this.lists;
    }

    getList(id: number): List {
        return this.lists.filter((list) => list.id === id)[0];
    }
}
