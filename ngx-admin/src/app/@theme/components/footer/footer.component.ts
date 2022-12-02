import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <b><a href="https://github.com/JuanZapataV2/parkings-frontend" target="_blank">Juan-is</a></b> 2022
    </span>
  `,
})
export class FooterComponent {
}
