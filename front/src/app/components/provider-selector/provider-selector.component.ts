import { Component, OnInit, Input } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Provider } from '../../models/provider-model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-provider-selector',
  templateUrl: './provider-selector.component.html',
  styleUrls: ['./provider-selector.component.css']
})
export class ProviderSelectorComponent implements OnInit {
  @Input('parentForm')
  public parentForm: FormGroup;
  providerService: ProviderService

  constructor(private providerSrv: ProviderService) { 
    this.providerService = providerSrv;
  }

  ngOnInit() {
    this.getProviders();
  }

  getProviders() {
    this.providerService.getProviders()
      .subscribe(res => {
        this.providerService.providers = res as Provider[];
      });
  }

  setProviderId(event) {
    this.parentForm.get('_id').setValue(event.srcElement.selectedOptions[0].id);
  }
}
