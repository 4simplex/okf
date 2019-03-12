import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { NgForm } from '@angular/forms';
import { Provider } from 'src/app/models/provider-model';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
  selectedProvider: Provider;
  providers: Provider[];
  actualPage: Number = 1;
  constructor(private providerService: ProviderService) {
    this.selectedProvider = new Provider();
  }

  ngOnInit() {
    this.getProviders();
  }

  addProvider(form: NgForm) {
    if (form.controls.name.value.trim() === '') {
      alert('Dato no válido. Debe escribir un proveedor');
      return;
    }

    let name = form.controls.name.value;
    const nameWithOneSpace = RemoveWhiteSpaces(name);
    const id = 'noId';

    this.providerService.getProviderByName(nameWithOneSpace, id)
      .subscribe(res => {
        if (res != null) {
          if (nameWithOneSpace.toLowerCase() === res.name.toLowerCase()) {
            alert('El Proveedor ya existe');
          }
        } else {
          if (!nameWithOneSpace) { return; }
          name = nameWithOneSpace;
          let info = form.controls.info.value;
          this.providerService.postProvider({ name, info } as Provider)
            .subscribe(provider => {
              this.providers.push(provider);
              this.selectedProvider._id = '';
              this.selectedProvider.name = '';
              this.selectedProvider.info = '';
            });
        }
      });
  }

  getProviders() {
    this.providerService.getProviders()
      .subscribe(res => {
        this.providers = res as Provider[];
      });
  }

  editProvider(provider: Provider) {
    this.providerService.selectedProvider = provider;
  }

  deleteProvider(_id: string) {
    if (confirm('Está seguro de querer eliminarlo?')) {
      this.providerService.deleteProvider(_id)
        .subscribe(res => {
          this.getProviders();
        });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.providerService.selectedProvider = new Provider();
    }
  }

}
