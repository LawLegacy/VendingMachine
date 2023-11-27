import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { VendingMachineService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

@Component({ templateUrl: 'purchase.component.html' })
export class PurchaseComponent implements OnInit {
    
    id?: string;
    loading = false;
    allowPayment = false;
    submitting = false;
    submitted = false;
    name!: string;
    cost: number = 0;
    balance: number = 0;
    snack!: any;
    paymentReadonly = false;
    receiptScreen = false;
    change!: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private vendingMachineService: VendingMachineService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
 
        if (this.id) {
            
            this.loading = true;
            this.vendingMachineService.getById(this.id)
                .pipe(first())
                .subscribe(snack => {
                    this.loading = false;
                    this.snack = snack;
                    this.cost = this.snack.cost;
                    this.balance = this.snack.cost;
                    this.name = this.snack.name;
                    this.disablePayment();
                });
        }
    }

    ngOnAfterViewInit() {
        
    }
 
    payWithFive() {
        this.balance -= 5;
        this.disablePayment();
    }

    payWithOne() {
        this.balance -= 1;
        this.disablePayment();
    }

    payWithQuarter() {
        this.balance -= .25;
        this.disablePayment();
    }

    disablePayment() {
         
        if (this.balance <= 0) {
            this.paymentReadonly = true;
            this.allowPayment = true;
        }
    }

    submitPayment() {
        this.submitted = true;
        this.receiptScreen = true;
        this.allowPayment = false;

        let changeValue: number = Math.abs(this.balance);

        this.change = "$" + changeValue + "  (" + changeValue / .25 + " Quarters)";

        this.vendingMachineService.decreaseQuantity(this.id!, this.snack).pipe(first())
        .subscribe({
            next: () => {
                this.alertService.success('Purchase Sucessful', { keepAfterRouteChange: true });
            },
            error: error => {
                this.alertService.error(error);
                this.submitting = false;
            }
        })

        // reset alerts on submit
        this.alertService.clear();
    }

}