import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    IonicModule, 
    CommonModule,
    FormsModule,
    HomePageRoutingModule, RouterModule.forChild([{ path: '', component: HomePage }]),
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
