import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppointmentService } from '../shared/appointment.service';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.page.html',
  styleUrls: ['./make-appointment.page.scss'],
})
export class MakeAppointmentPage implements OnInit {
  bookingForm: FormGroup;

  constructor(
    private aptService: AppointmentService,
    private router: Router,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required]
    });
  }

  formSubmit() {
    if (!this.bookingForm.valid) {
      return;
    }

    this.aptService.createBooking(this.bookingForm.value)
      .then(() => {
        this.bookingForm.reset();
        this.router.navigate(['/home']);
      })
      .catch(error => console.log(error));
  }
}
