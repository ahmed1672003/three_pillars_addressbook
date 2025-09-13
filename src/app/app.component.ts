import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AuthComponent } from "./components/auth/auth.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegisterComponent, AuthComponent, HomeComponent, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'three_pillars_addressbook';
}
