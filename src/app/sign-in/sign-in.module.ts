import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in.component';
import { MaterialModule } from '../material.module';

const routes: Routes = [{ path: '', component: SignInComponent }];

@NgModule({
  declarations: [SignInComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule,RouterModule.forChild(routes)],
})
export class SignInModule {}
