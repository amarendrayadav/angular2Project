import { Injectable } from "@angular/core";
@Injectable()
export class VegsService {
    private vegsCreateUrl = ["/api/v1/vegs-management/vegs"];
    private vegListUrl = ["/api/v1/vegs-management/vegs", "/vegs_general_view.json"];
    private vegUrl = ["/api/v1/vegs-management/vegs/{id}", "/vegs_extended_view.json"];

}
