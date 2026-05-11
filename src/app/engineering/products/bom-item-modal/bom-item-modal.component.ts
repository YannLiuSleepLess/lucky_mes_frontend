import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../proxy/engineering/products/product.service';
import { BomItemDto } from '../../../proxy/engineering/products/dtos/models';

@Component({
  selector: 'app-bom-item-modal',
  templateUrl: './bom-item-modal.component.html',
  styleUrls: ['./bom-item-modal.component.scss'],
})
export class BomItemModalComponent implements OnInit {
  @Input() productId: string;
  @Input() versionId: string;
  @Input() item: BomItemDto;

  form: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.buildForm();
    if (this.item) {
      this.form.patchValue({
        componentProductId: this.item.componentProductId,
        quantity: this.item.quantity,
        scrapRate: this.item.scrapRate,
        unit: this.item.unit,
        sequence: this.item.sequence,
        parentItemId: this.item.parentItemId,
      });
    }
  }

  buildForm() {
    this.form = this.fb.group({
      componentProductId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(0.0001)]],
      scrapRate: [0, Validators.min(0)],
      unit: [''],
      sequence: [1, Validators.required],
      parentItemId: [''],
    });
  }

  submitForm() {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    const request = {
      componentProductId: this.form.value.componentProductId,
      quantity: this.form.value.quantity,
      scrapRate: this.form.value.scrapRate,
      unit: this.form.value.unit,
      sequence: this.form.value.sequence,
      parentItemId: this.form.value.parentItemId || null,
    };

    if (this.item?.id) {
      this.productService.updateBomItem(this.productId, this.versionId, this.item.id, request).subscribe({
        next: () => this.activeModal.close(),
        error: () => (this.isSubmitting = false),
      });
    } else {
      this.productService.addBomItem(this.productId, request).subscribe({
        next: () => this.activeModal.close(),
        error: () => (this.isSubmitting = false),
      });
    }
  }

  close() {
    this.activeModal.dismiss();
  }
}
