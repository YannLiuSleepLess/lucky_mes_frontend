import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { EngineeringChangeService } from '../../../proxy/engineering/changes/engineering-change.service';
import { EngineeringChangeDto } from '../../../proxy/engineering/changes/dtos/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeModalComponent } from '../change-modal/change-modal.component';
import { EcnStatus, Priority, ChangeType, ecnStatusOptions, changeTypeOptions, priorityOptions } from '../../../proxy/enums';

@Component({
  selector: 'app-change-list',
  templateUrl: './change-list.component.html',
  styleUrls: ['./change-list.component.scss'],
  providers: [ListService],
})
export class ChangeListComponent implements OnInit {
  data: PagedResultDto<EngineeringChangeDto> = { items: [], totalCount: 0 };

  readonly Math = Math;

  ecnStatusOptions = ecnStatusOptions;
  changeTypeOptions = changeTypeOptions;
  priorityOptions = priorityOptions;

  constructor(
    public readonly list: ListService,
    private engineeringChangeService: EngineeringChangeService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    const streamCreator = (query) => this.engineeringChangeService.getList(query);
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.data = response;
    });
  }

  createChange() {
    const modalRef = this.modalService.open(ChangeModalComponent, { size: 'lg' });
    modalRef.componentInstance.isEditing = false;
    modalRef.result.then(() => this.list.get(), () => {});
  }

  editChange(id: string) {
    const modalRef = this.modalService.open(ChangeModalComponent, { size: 'lg' });
    modalRef.componentInstance.isEditing = true;
    modalRef.componentInstance.changeId = id;
    modalRef.result.then(() => this.list.get(), () => {});
  }

  deleteChange(id: string, ecnNo: string) {
    if (confirm(`确定要删除工程变更单 ${ecnNo} 吗？`)) {
      this.engineeringChangeService.delete(id).subscribe(() => this.list.get());
    }
  }

  submitForReview(id: string, ecnNo: string) {
    if (confirm(`确定要提交工程变更单 ${ecnNo} 审批吗？`)) {
      this.engineeringChangeService.submitForReview(id).subscribe(() => this.list.get());
    }
  }

  approveChange(id: string, ecnNo: string) {
    if (confirm(`确定要批准工程变更单 ${ecnNo} 吗？`)) {
      this.engineeringChangeService.approve(id).subscribe(() => this.list.get());
    }
  }

  executeChange(id: string, ecnNo: string) {
    if (confirm(`确定要执行工程变更单 ${ecnNo} 吗？`)) {
      this.engineeringChangeService.execute(id).subscribe(() => this.list.get());
    }
  }

  onPageChange(page: number): void {
    this.list.page = page - 1;
  }

  getStatusClass(status: number): string {
    const classMap: Record<number, string> = {
      [EcnStatus.Draft]: 'bg-secondary',
      [EcnStatus.PendingReview]: 'bg-warning',
      [EcnStatus.Approved]: 'bg-success',
      [EcnStatus.Executed]: 'bg-info',
      [EcnStatus.Cancelled]: 'bg-dark',
    };
    return classMap[status] || 'bg-secondary';
  }

  getPriorityClass(priority: number): string {
    const classMap: Record<number, string> = {
      [Priority.Low]: 'bg-light text-dark',
      [Priority.Medium]: 'bg-info',
      [Priority.High]: 'bg-warning',
      [Priority.Urgent]: 'bg-danger',
    };
    return classMap[priority] || 'bg-light';
  }

  trackByChangeId(index: number, change: EngineeringChangeDto): string {
    return change.id || index.toString();
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