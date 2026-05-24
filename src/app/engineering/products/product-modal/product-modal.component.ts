import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../proxy/engineering/products/product.service';
import { CreateProductRequest, ProductDto, UpdateProductRequest } from '../../../proxy/engineering/products/dtos/models';
import { ToasterService } from '@abp/ng.theme.shared';
import { productTypeOptions, ProductType } from '../../../proxy/enums';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit {
  @Input() isEditing = false;
  @Input() productId: string;

  form: FormGroup;
  isSubmitting = false;

  productTypeOptions = productTypeOptions;

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private productService: ProductService,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.buildForm();

    if (this.isEditing && this.productId) {
      this.loadProduct();
    }
  }

  buildForm() {
    this.form = this.fb.group({
      productCode: ['', [Validators.required, Validators.maxLength(50)]],
      productName: ['', [Validators.required, Validators.maxLength(200)]],
      type: [ProductType.FinishedGood, Validators.required],
      material: ['', Validators.maxLength(100)],
      unit: ['', Validators.maxLength(20)],
      isActive: [true],
      specification: this.fb.group({
        length: [''],
        width: [''],
        height: [''],
        thickness: [''],
        weight: [''],
        customSpecs: ['', Validators.maxLength(500)],
      }),
    });

    if (this.isEditing) {
      this.form.get('productCode').disable();
    }
  }

  loadProduct() {
    this.productService.get(this.productId).subscribe((product) => {
      const spec = product.specification;
      this.form.patchValue({
        productCode: product.productCode,
        productName: product.productName,
        type: product.type,
        material: product.material ?? '',
        unit: product.unit ?? '',
        isActive: product.isActive,
      });
      this.form.get('specification')!.patchValue({
        length: spec?.length ?? '',
        width: spec?.width ?? '',
        height: spec?.height ?? '',
        thickness: spec?.thickness ?? '',
        weight: spec?.weight ?? '',
        customSpecs: spec?.customSpecs ?? '',
      });
    });
  }

  submitForm() {
    if (this.form.invalid) {
      this.toasterService.warn('请填写必填项', '提示');
      return;
    }

    this.isSubmitting = true;

    if (this.isEditing) {
      const v = this.form.getRawValue();
      const request: UpdateProductRequest = {
        productName: v.productName,
        type: v.type,
        material: v.material,
        unit: v.unit,
        isActive: v.isActive,
        specification: v.specification,
      };

      this.productService.update(this.productId, request).subscribe({
        next: () => {
          this.activeModal.close();
          this.toasterService.success('产品更新成功', '成功');
        },
        error: (err) => {
          this.isSubmitting = false;
          this.toasterService.error(err.message || '更新失败', '错误');
        },
      });
    } else {
      const request: CreateProductRequest = {
        productCode: this.form.value.productCode,
        productName: this.form.value.productName,
        type: this.form.value.type,
        material: this.form.value.material,
        unit: this.form.value.unit,
        specification: this.form.value.specification,
      };

      this.productService.create(request).subscribe({
        next: () => {
          this.activeModal.close();
          this.toasterService.success('产品创建成功', '成功');
        },
        error: (err) => {
          this.isSubmitting = false;
          this.toasterService.error(err.message || '创建失败', '错误');
        },
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
