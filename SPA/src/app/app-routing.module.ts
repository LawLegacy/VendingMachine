import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';

const vendingMachineModule = () => import('./vending-machine/vending-machine.module').then(x => x.VendingMachineModule);

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'vendingmachine', loadChildren: vendingMachineModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }