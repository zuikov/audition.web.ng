import { NgModule } from '@angular/core';

import {
    MatMenuModule, MatButtonModule, MatDialogModule, MatInputModule, MatFormFieldModule,
    MatSelectModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatTooltipModule, MatExpansionModule
} from '@angular/material';

@NgModule({
    exports: [
        MatMenuModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatExpansionModule
    ],
    declarations: [

    ],
    entryComponents: [

    ],
    providers: [

    ],
    bootstrap: []
})

export class MaterialsModule { }
