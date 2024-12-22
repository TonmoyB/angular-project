import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private router: Router) { }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
