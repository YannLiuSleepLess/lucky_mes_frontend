import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkCenterService } from '../../../proxy/basic-data/work-centers/work-center.service';
import { CreateWorkCenterRequest, UpdateWorkCenterRequest, WorkCenterDto } from '../../../proxy/basic-data/work-centers/dtos/models';
import { WorkshopDto } from '../../../proxy/basic-data/workshops/dtos/models';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-work-center-modal',
  templateUrl: './work-center-modal.component.html',
  styleUrls: ['./work-center-modal.component.scss'],
})
export class WorkCenterModalComponent implements OnInit {
  @Input() isEditing = false;
  @Input() workCenterId: string;
  @Input() workshops: WorkshopDto[] = [];

  form: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private workCenterService: WorkCenterService,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.buildForm();

    if (this.isEditing && this.workCenterId) {
      this.loadWorkCenter();
    }
  }

  buildForm() {
    this.form = this.fb.group({
      workCenterCode: ['', [Validators.required, Validators.maxLength(50)]],
      workCenterName: ['', [Validators.required, Validators.maxLength(200)]],
      workshopId: ['', Validators.required],
      capacity: [0, [Validators.required, Validators.min(0)]],
      shiftCount: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      isActive: [true],
    });

    if (this.isEditing) {
      this.form.get('workCenterCode').disable();
    }
  }

  loadWorkCenter() {
    this.workCenterService.get(this.workCenterId).subscribe((workCenter) => {
      this.form.patchValue({
        workCenterCode: workCenter.workCenterCode,
        workCenterName: workCenter.workCenterName,
        workshopId: workCenter.workshopId,
        capacity: workCenter.capacity,
        shiftCount: workCenter.shiftCount,
        isActive: workCenter.isActive,
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
      const request: UpdateWorkCenterRequest = {
        workCenterName: v.workCenterName,
        workshopId: v.workshopId,
        capacity: v.capacity,
        shiftCount: v.shiftCount,
        isActive: v.isActive,
      };

      this.workCenterService.update(this.workCenterId, request).subscribe({
        next: () => {
          this.activeModal.close();
          this.toasterService.success('工作中心更新成功', '成功');
        },
        error: (err) => {
          this.isSubmitting = false;
          this.toasterService.error(err.message || '更新失败', '错误');
        },
      });
    } else {
      const request: CreateWorkCenterRequest = {
        workCenterCode: this.form.value.workCenterCode,
        workCenterName: this.form.value.workCenterName,
        workshopId: this.form.value.workshopId,
        capacity: this.form.value.capacity,
        shiftCount: this.form.value.shiftCount,
      };

      this.workCenterService.create(request).subscribe({
        next: () => {
          this.activeModal.close();
          this.toasterService.success('工作中心创建成功', '成功');
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

  trackByWorkshopId(index: number, workshop: WorkshopDto): string {
    return workshop.id || index.toString();
  }
}
