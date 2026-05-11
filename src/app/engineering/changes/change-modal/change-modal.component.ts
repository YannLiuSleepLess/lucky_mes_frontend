import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EngineeringChangeService } from '../../../proxy/engineering/changes/engineering-change.service';
import { CreateEngineeringChangeRequest } from '../../../proxy/engineering/changes/dtos/models';
import { changeTypeOptions, priorityOptions, ChangeType, Priority } from '../../../proxy/enums';

@Component({
  selector: 'app-change-modal',
  templateUrl: './change-modal.component.html',
  styleUrls: ['./change-modal.component.scss'],
})
export class ChangeModalComponent implements OnInit {
  @Input() isEditing = false;
  @Input() changeId: string;

  form: FormGroup;
  isSubmitting = false;

  changeTypeOptions = changeTypeOptions;
  priorityOptions = priorityOptions;

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private engineeringChangeService: EngineeringChangeService
  ) {}

  ngOnInit() {
    this.buildForm();

    if (this.isEditing && this.changeId) {
      this.loadChange();
    }
  }

  buildForm() {
    this.form = this.fb.group({
      ecnNo: ['', Validators.required],
      title: ['', Validators.required],
      type: [ChangeType.BomChange, Validators.required],
      description: [''],
      priority: [Priority.Medium, Validators.required],
      affectedProductIds: [''],
      affectedBomVersionIds: [''],
      affectedProcessRouteIds: [''],
    });

    if (this.isEditing) {
      this.form.get('ecnNo').disable();
    }
  }

  loadChange() {
    this.engineeringChangeService.get(this.changeId).subscribe((change) => {
      this.form.patchValue({
        ecnNo: change.ecnNo,
        title: change.title,
        type: change.type,
        description: change.description,
        priority: change.priority,
        affectedProductIds: change.affectedProductIds?.join(',') || '',
        affectedBomVersionIds: change.affectedBomVersionIds?.join(',') || '',
        affectedProcessRouteIds: change.affectedProcessRouteIds?.join(',') || '',
      });
    });
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;

    const parseArray = (value: string): string[] => {
      if (!value) return [];
      return value.split(',').map((s) => s.trim()).filter((s) => s);
    };

    if (this.isEditing) {
      this.engineeringChangeService.update(this.changeId, {
        ...this.form.value,
        affectedProductIds: parseArray(this.form.value.affectedProductIds),
        affectedBomVersionIds: parseArray(this.form.value.affectedBomVersionIds),
        affectedProcessRouteIds: parseArray(this.form.value.affectedProcessRouteIds),
      }).subscribe({
        next: () => this.activeModal.close(),
        error: () => (this.isSubmitting = false),
      });
    } else {
      const request: CreateEngineeringChangeRequest = {
        ecnNo: this.form.value.ecnNo,
        title: this.form.value.title,
        type: this.form.value.type,
        description: this.form.value.description,
        priority: this.form.value.priority,
        affectedProductIds: parseArray(this.form.value.affectedProductIds),
        affectedBomVersionIds: parseArray(this.form.value.affectedBomVersionIds),
        affectedProcessRouteIds: parseArray(this.form.value.affectedProcessRouteIds),
      };

      this.engineeringChangeService.create(request).subscribe({
        next: () => this.activeModal.close(),
        error: () => (this.isSubmitting = false),
      });
    }
  }

  close() {
    this.activeModal.dismiss();
  }
}