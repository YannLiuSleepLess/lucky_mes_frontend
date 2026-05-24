import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../proxy/engineering/products/product.service';
import { ProductVersionDto } from '../../../proxy/engineering/products/dtos/models';
import { bomTypeOptions, BomType } from '../../../proxy/enums';

@Component({
  selector: 'app-bom-version-modal',
  templateUrl: './bom-version-modal.component.html',
  styleUrls: ['./bom-version-modal.component.scss'],
})
export class BomVersionModalComponent implements OnInit {
  @Input() productId: string;
  @Input() versionId: string;
  @Input() version: ProductVersionDto;

  form: FormGroup;
  isSubmitting = false;

  bomTypeOptions = bomTypeOptions;

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.buildForm();
    if (this.version) {
      this.form.patchValue({
        versionNo: this.version.versionNo,
        bomType: this.version.bomType,
        changeReason: this.version.changeReason,
        isActive: this.version.isActive,
      });
    }
  }

  buildForm() {
    this.form = this.fb.group({
      versionNo: ['', Validators.required],
      bomType: [BomType.EBOM, Validators.required],
      changeReason: [''],
      isActive: [true],
    });
  }

  submitForm() {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    const request = {
      versionNo: this.form.value.versionNo,
      bomType: this.form.value.bomType,
      changeReason: this.form.value.changeReason,
      isActive: this.form.value.isActive,
    };

    if (this.versionId) {
      this.productService.updateBomVersion(this.productId, this.versionId, request).subscribe({
        next: () => this.activeModal.close(),
        error: () => (this.isSubmitting = false),
      });
    } else {
      const reason = this.form.value.changeReason || '创建新版本';
      this.productService.createNewBomVersion(this.productId, reason).subscribe({
        next: () => this.activeModal.close(),
        error: () => (this.isSubmitting = false),
      });
    }
  }

  close() {
    this.activeModal.dismiss();
  }

  trackByOptionValue(index: number, option: any): string {
    if (!option) return `opt-undefined-${index}`;
    
    const value = option.value;
    const key = option.key;
    
    if (value === null || value === undefined) {
      return key !== null && key !== undefined 
        ? `opt-key-${key}` 
        : `opt-${index}`;
    }
    
    if (typeof value === 'object') {
      const valueStr = JSON.stringify(value);
      return key !== null && key !== undefined 
        ? `opt-obj-${key}-${valueStr}` 
        : `opt-obj-${index}-${valueStr}`;
    }
    
    return key !== null && key !== undefined 
      ? `opt-${key}` 
      : `opt-${value}`;
  }
}
