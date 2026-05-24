import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { WorkshopService } from '../../../proxy/basic-data/workshops/workshop.service';
import { WorkshopDto } from '../../../proxy/basic-data/workshops/dtos/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkshopModalComponent } from '../workshop-modal/workshop-modal.component';

@Component({
  selector: 'app-workshop-list',
  templateUrl: './workshop-list.component.html',
  styleUrls: ['./workshop-list.component.scss'],
  providers: [ListService],
})
export class WorkshopListComponent implements OnInit {
  data: PagedResultDto<WorkshopDto> = { items: [], totalCount: 0 };

  readonly Math = Math;

  constructor(
    public readonly list: ListService,
    private workshopService: WorkshopService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    const workshopStreamCreator = (query) => this.workshopService.getList(query);
    this.list.hookToQuery(workshopStreamCreator).subscribe((response) => {
      this.data = response;
    });
  }

  createWorkshop() {
    const modalRef = this.modalService.open(WorkshopModalComponent, { size: 'lg' });
    modalRef.componentInstance.isEditing = false;
    modalRef.result.then(() => this.list.get(), () => {});
  }

  editWorkshop(id: string) {
    const modalRef = this.modalService.open(WorkshopModalComponent, { size: 'lg' });
    modalRef.componentInstance.isEditing = true;
    modalRef.componentInstance.workshopId = id;
    modalRef.result.then(() => this.list.get(), () => {});
  }

  deleteWorkshop(id: string, workshopCode: string) {
    if (confirm(`确定要删除车间 ${workshopCode} 吗？`)) {
      this.workshopService.delete(id).subscribe(() => this.list.get());
    }
  }

  onPageChange(page: number): void {
    this.list.page = page - 1;
  }
}
