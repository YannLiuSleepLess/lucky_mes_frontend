import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkshopService } from '../../../proxy/basic-data/workshops/workshop.service';
import { CreateWorkshopRequest, UpdateWorkshopRequest, WorkshopDto } from '../../../proxy/basic-data/workshops/dtos/models';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-workshop-modal',
  templateUrl: './workshop-modal.component.html',
  styleUrls: ['./workshop-modal.component.scss'],
})
export class WorkshopModalComponent implements OnInit {
  @Input() isEditing = false;
  @Input() workshopId: string;

  form: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private workshopService: WorkshopService,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.buildForm();

    if (this.isEditing && this.workshopId) {
      this.loadWorkshop();
    }
  }

  buildForm() {
    this.form = this.fb.group({
      workshopCode: ['', [Validators.required, Validators.maxLength(50)]],
      workshopName: ['', [Validators.required, Validators.maxLength(200)]],
      location: ['', Validators.maxLength(200)],
      managerId: ['', Validators.maxLength(50)],
      isActive: [true],
    });

    if (this.isEditing) {
      this.form.get('workshopCode').disable();
    }
  }

  loadWorkshop() {
    this.workshopService.get(this.workshopId).subscribe((workshop) => {
      this.form.patchValue({
        workshopCode: workshop.workshopCode,
        workshopName: workshop.workshopName,
        location: workshop.location ?? '',
        managerId: workshop.managerId ?? '',
        isActive: workshop.isActive,
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
      const request: UpdateWorkshopRequest = {
        workshopName: v.workshopName,
        location: v.location,
        managerId: v.managerId,
        isActive: v.isActive,
      };

      this.workshopService.update(this.workshopId, request).subscribe({
        next: () => {
          this.activeModal.close();
          this.toasterService.success('车间更新成功', '成功');
        },
        error: (err) => {
          this.isSubmitting = false;
          this.toasterService.error(err.message || '更新失败', '错误');
        },
      });
    } else {
      const request: CreateWorkshopRequest = {
        workshopCode: this.form.value.workshopCode,
        workshopName: this.form.value.workshopName,
        location: this.form.value.location,
        managerId: this.form.value.managerId,
      };

      this.workshopService.create(request).subscribe({
        next: () => {
          this.activeModal.close();
          this.toasterService.success('车间创建成功', '成功');
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
}
