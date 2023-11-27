import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { VendingMachineService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private vendingMachineService: VendingMachineService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
                
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            quantity: ['', Validators.required],
            cost: ['', Validators.required],
            status: ['', Validators.required],
        });

        this.title = 'Add Snack';
        if (this.id) {
            // edit mode
            this.title = 'Edit Snack';
            this.loading = true;
            this.vendingMachineService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x);
                    this.loading = false;
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        // check cost is multiple of .25 cents
        if(this.form.value["cost"] % .25 != 0) {
            this.alertService.error('The cost should be multiple of .25 cents', { keepAfterRouteChange: false });
            return;
        }

        this.submitting = true;
        this.saveSnack()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Snack saved', { keepAfterRouteChange: true });
                    this.router.navigateByUrl('/vendingmachine');
                },
                error: error => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }

    private saveSnack() {
        // create or update snack based on id param
        return this.id
            ? this.vendingMachineService.update(this.id!, this.form.value)
            : this.vendingMachineService.create(this.form.value);
    }
}