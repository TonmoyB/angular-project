import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;

  ngOnInit(): void {
  }

  constructor(private fb: FormBuilder, private toastService: ToastService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      localStorage.setItem('contactFormData', JSON.stringify(formData));
      this.toastService.show('Your message has been sent!', 'success');
      this.contactForm.reset();
    } else {
      this.toastService.show('Please fill out all fields correctly!', 'error');
    }
  }
}
