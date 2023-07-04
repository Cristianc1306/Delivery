import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngbd-modal-confirm",
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">{{ title }}</h4>
    </div>
    <div class="modal-body">
      <p>
        <strong>{{ message }}</strong>
      </p>
      <p *ngIf="description">
        {{ description }}
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-success"
        (click)="modal.dismiss()"
      >
        Cancelar
      </button>
      <button type="button" class="btn btn-danger" (click)="modal.close()">
        Confirmar
      </button>
    </div>
  `,
})
export class NgbdModalConfirm {
  title = "";
  description = "";
  message = "";

  constructor(public modal: NgbActiveModal) {}
}
