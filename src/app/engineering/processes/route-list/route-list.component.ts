import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { ProcessRouteService } from '../../../proxy/engineering/processes/process-route.service';
import { ProcessRouteDto } from '../../../proxy/engineering/processes/dtos/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouteModalComponent } from '../route-modal/route-modal.component';
import { ProcessRouteStatus, processRouteStatusOptions } from '../../../proxy/enums';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss'],
  providers: [ListService],
})
export class RouteListComponent implements OnInit {
  data: PagedResultDto<ProcessRouteDto> = { items: [], totalCount: 0 };

  /** Expose for template (e.g. range display). */
  readonly Math = Math;

  processRouteStatusOptions = processRouteStatusOptions;

  constructor(
    public readonly list: ListService,
    private processRouteService: ProcessRouteService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    const streamCreator = (query) => this.processRouteService.getList(query);
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.data = response;
    });
  }

  createRoute() {
    const modalRef = this.modalService.open(RouteModalComponent, { size: 'lg' });
    modalRef.componentInstance.isEditing = false;
    modalRef.result.then(() => this.list.get(), () => {});
  }

  editRoute(id: string) {
    const modalRef = this.modalService.open(RouteModalComponent, { size: 'lg' });
    modalRef.componentInstance.isEditing = true;
    modalRef.componentInstance.routeId = id;
    modalRef.result.then(() => this.list.get(), () => {});
  }

  deleteRoute(id: string, routeCode: string) {
    if (confirm(`确定要删除工艺路线 ${routeCode} 吗？`)) {
      this.processRouteService.delete(id).subscribe(() => this.list.get());
    }
  }

  publishRoute(id: string, routeCode: string) {
    if (confirm(`确定要发布工艺路线 ${routeCode} 吗？`)) {
      this.processRouteService.publish(id).subscribe(() => this.list.get());
    }
  }

  /** `NgbPagination` is 1-based; `ListService.page` is 0-based (ABP). */
  onPageChange(page: number): void {
    this.list.page = page - 1;
  }

  getStatusClass(status: number): string {
    const classMap: Record<number, string> = {
      [ProcessRouteStatus.Draft]: 'badge-secondary',
      [ProcessRouteStatus.Published]: 'badge-success',
      [ProcessRouteStatus.Archived]: 'badge-info',
    };
    return classMap[status] || 'badge-secondary';
  }
}