import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { VendingMachineService, AlertService } from '@app/_services';
import { Status } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    snacks!: any[];
    totalActive?: number;
    totalInactive?: number;
    selectedView? : string = "All";
    deletingCompleted : boolean = false;

    constructor(private vendingMachineService: VendingMachineService, private alertService: AlertService) {}

    ngOnInit() {
        this.vendingMachineService.getAll()
            .pipe(first())
            .subscribe(snacks => 
            {
                this.snacks = snacks;
                this.totalActive = this.snacks.length;
                this.totalInactive = this.snacks.filter(x => x.status == "Inactive").length;
            });

        
    }

    deleteSnack(id: string) {
        const snack = this.snacks!.find(x => x.id === id);
        snack.isDeleting = true;
        this.vendingMachineService.delete(id)
            .pipe(first())
            .subscribe(() => 
            {
                this.snacks = this.snacks!.filter(x => x.id !== id)
                this.alertService.success('Snack Deleted', { keepAfterRouteChange: true });
            });
    }

    purchaseSnack(id: string) {
        this.deletingCompleted = true;

        const snack = this.snacks!.find(x => x.id === id);
       
        return this.vendingMachineService.update(id, snack).subscribe(() => snack.isCompleting = false);;
    }

    onShowChange(value: any) {
        this.selectedView = value.target.value;
    }

    filterView(snack: any[]) {

        if (snack)
        {
            snack = snack!.filter(x => this.selectedView == "All" || x.status == this.selectedView)
        }
        
        return snack;
    }
}