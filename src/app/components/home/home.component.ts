import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  goToCollection(): void {
    this.router.navigate(["/collection"]);
  }

  goToWomen(): void {
    this.router.navigate(["/women"]);
  }

  goToMen(): void {
    this.router.navigate(["/men"]);
  }
  goToAll(): void {
    this.router.navigate(["/collection"]);
  }
  goToJoin(): void {
    this.toastService.show("Coming Soon !!!", 'info');
  }
}
