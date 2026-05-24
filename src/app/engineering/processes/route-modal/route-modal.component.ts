import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProcessRouteService } from '../../../proxy/engineering/processes/process-route.service';
import {
  CreateProcessRouteRequest,
  CreateProcessStepRequest,
  UpdateProcessRouteRequest,
} from '../../../proxy/engineering/processes/dtos/models';

@Component({
  selector: 'app-route-modal',
  templateUrl: './route-modal.component.html',
  styleUrls: ['./route-modal.component.scss'],
})
export class RouteModalComponent implements OnInit {
  @Input() isEditing = false;
  @Input() routeId: string;

  form: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private processRouteService: ProcessRouteService
  ) {}

  ngOnInit() {
    this.buildForm();

    if (this.isEditing && this.routeId) {
      this.loadRoute();
    }
  }

  buildForm() {
    this.form = this.fb.group({
      routeCode: ['', Validators.required],
      routeName: ['', Validators.required],
      productId: ['', Validators.required],
      steps: this.fb.array([]),
    });

    if (this.isEditing) {
      this.form.get('routeCode').disable();
    }
  }

  get steps(): FormArray {
    return this.form.get('steps') as FormArray;
  }

  addStep() {
    const stepGroup = this.fb.group({
      stepNo: ['', Validators.required],
      stepName: ['', Validators.required],
      standardTime: [0, Validators.required],
      isKeyProcess: [false],
      description: [''],
    });
    this.steps.push(stepGroup);
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  loadRoute() {
    this.processRouteService.get(this.routeId).subscribe((route) => {
      while (this.steps.length) {
        this.steps.removeAt(0);
      }

      this.form.patchValue({
        routeCode: route.routeCode,
        routeName: route.routeName,
        productId: route.productId,
      });

      if (route.steps?.length) {
        route.steps.forEach((step) => {
          const stepGroup = this.fb.group({
            stepNo: [step.stepNo, Validators.required],
            stepName: [step.stepName, Validators.required],
            standardTime: [step.standardTime ?? 0, Validators.required],
            isKeyProcess: [step.isKeyProcess ?? false],
            description: [step.description ?? ''],
          });
          this.steps.push(stepGroup);
        });
      }
    });
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;

    const value = this.form.getRawValue();

    if (this.isEditing) {
      this.processRouteService
        .update(this.routeId, value as UpdateProcessRouteRequest)
        .subscribe({
          next: () => this.activeModal.close(),
          error: () => (this.isSubmitting = false),
        });
    } else {
      const request: CreateProcessRouteRequest = {
        routeCode: value.routeCode,
        routeName: value.routeName,
        productId: value.productId,
        steps: value.steps as CreateProcessStepRequest[],
      };

      this.processRouteService.create(request).subscribe({
        next: () => this.activeModal.close(),
        error: () => (this.isSubmitting = false),
      });
    }
  }

  close() {
    this.activeModal.dismiss();
  }

  trackByIndex(index: number): number {
    return index.valueOf();
  }
}