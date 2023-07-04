import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngbd-modal-confirm",
  template: `
    <div class="modal-header"></div>
    <div class="modal-body">
      <h5>
        <strong>{{ message }}</strong>
      </h5>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="modal.close()">
        OK
      </button>
    </div>
  `,
})
export class NgbdModalInform {
  message = "";
  constructor(public modal: NgbActiveModal) {}
}
