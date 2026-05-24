import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { WorkCenterService } from '../../../proxy/basic-data/work-centers/work-center.service';
import { WorkCenterDto } from '../../../proxy/basic-data/work-centers/dtos/models';
import { WorkshopService } from '../../../proxy/basic-data/workshops/workshop.service';
import { WorkshopDto } from '../../../proxy/basic-data/workshops/dtos/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkCenterModalComponent } from '../work-center-modal/work-center-modal.component';

@Component({
  selector: 'app-work-center-list',
  templateUrl: './work-center-list.component.html',
  styleUrls: ['./work-center-list.component.scss'],
  providers: [ListService],
})
export class WorkCenterListComponent implements OnInit {
  data: PagedResultDto<WorkCenterDto> = { items: [], totalCount: 0 };
  workshops: WorkshopDto[] = [];
  selectedWorkshopId: string = '';

  readonly Math = Math;

  constructor(
    public readonly list: ListService,
    private workCenterService: WorkCenterService,
    private workshopService: WorkshopService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.loadWorkshops();
    const workCenterStreamCreator = (query) => {
      if (this.selectedWorkshopId) {
        return this.workCenterService.getList({
          ...query,
          workshopId: this.selectedWorkshopId,
        });
      }
      return this.workCenterService.getList(query);
    };
    this.list.hookToQuery(workCenterStreamCreator).subscribe((response) => {
      this.data = response;
    });
  }

  loadWorkshops() {
    this.workshopService.getList({ maxResultCount: 100, skipCount: 0, sorting: '' }).subscribe((result) => {
      this.workshops = result.items;
    });
  }

  filterByWorkshop() {
    this.list.get();
  }

  createWorkCenter() {
    const modalRef = this.modalService.open(WorkCenterModalComponent, { size: 'lg' });
    modalRef.componentInstance.isEditing = false;
    modalRef.componentInstance.workshops = this.workshops;
    modalRef.result.then(() => this.list.get(), () => {});
  }

  editWorkCenter(id: string) {
    const modalRef = this.modalService.open(WorkCenterModalComponent, { size: 'lg' });
    modalRef.componentInstance.isEditing = true;
    modalRef.componentInstance.workCenterId = id;
    modalRef.componentInstance.workshops = this.workshops;
    modalRef.result.then(() => this.list.get(), () => {});
  }

  deleteWorkCenter(id: string, workCenterCode: string) {
    if (confirm(`确定要删除工作中心 ${workCenterCode} 吗？`)) {
      this.workCenterService.delete(id).subscribe(() => this.list.get());
    }
  }

  onPageChange(page: number): void {
    this.list.page = page - 1;
  }
}
