import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [ HeaderComponent ],
    entryComponents: [],
    imports: [ IonicModule  ],
    exports: [ HeaderComponent ],
    providers: [],
    bootstrap: []
  })
  export class SharedModule {}