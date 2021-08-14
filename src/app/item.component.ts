import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component ({
    selector: "item-info",
    template: `
        <h2>Моделб {{ id }}</h2>
    `
})
export class ItemComponent {
    id: string;

    constructor(private activateRoute: ActivatedRoute) {
        this.id = activateRoute.snapshot.params["id"];
    } 
}