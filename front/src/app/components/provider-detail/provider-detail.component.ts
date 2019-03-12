import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Provider } from '../../models/provider-model';
import { ProviderService } from '../../services/provider.service';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';

@Component({
  selector: 'app-provider-detail',
  templateUrl: './provider-detail.component.html',
  styleUrls: ['./provider-detail.component.css']
})
export class ProviderDetailComponent implements OnInit {
  @Input() provider: Provider;
  nameUnchanged: string;
  infoUnchanged: string;

  constructor(private route: ActivatedRoute,
    private providerService: ProviderService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getProvider();
  }

  getProvider(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.providerService.getProvider(id)
      .subscribe(b => {
        this.provider = b;
        this.nameUnchanged = this.provider.name;
        this.infoUnchanged = this.provider.info;
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(providerForm: NgForm): void {
    const name = providerForm.controls.name.value;
    const nameWithOneSpace = RemoveWhiteSpaces(name);

    if (nameWithOneSpace == this.nameUnchanged
      && providerForm.controls.info.value == this.infoUnchanged) {
      this.goBack();
      return;
    }
    const localId = RemoveWhiteSpaces(this.route.snapshot.paramMap.get('id'));

    this.providerService.getProviderByName(nameWithOneSpace, localId)
      .subscribe(res => {
        if (res != null) {
          if (localId === res._id) {
            this.provider.name = nameWithOneSpace;
            this.provider.info = providerForm.controls.info.value;
            this.providerService.putProvider(this.provider)
              .subscribe(() => this.goBack());
          } else {
            alert('El Proveedor ya existe');
          }
        }

        if (res == null) {
          this.providerService.putProvider(this.provider)
            .subscribe(() => this.goBack());
        }
      });
  }
}
