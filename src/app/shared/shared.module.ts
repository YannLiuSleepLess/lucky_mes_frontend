import { CoreModule } from '@abp/ng.core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    ThemeSharedModule,
    NgbModule,
    NgxValidateCoreModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CoreModule,
    ThemeSharedModule,
    NgbModule,
    NgxValidateCoreModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: []
})
export class SharedModule {}
