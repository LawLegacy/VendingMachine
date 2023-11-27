import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { VendingMachineRoutingModule } from './vending-machine-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { PurchaseComponent } from './purchase.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        VendingMachineRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent,
        PurchaseComponent
    ]
})
export class VendingMachineModule { }