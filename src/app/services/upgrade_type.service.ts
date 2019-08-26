import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UpgradeTypeDto } from '../dtos/upgrade_type_dto.model';
import { Entry } from 'contentful';

@Injectable({
  providedIn: 'root'
})
export class UpgradeTypeService {

  constructor(private apiService: ApiService) { }

  public buildUpgradeTypeDtoFromApiData(apiData: Entry<any>): UpgradeTypeDto {
    return new UpgradeTypeDto(apiData.sys.id, apiData.fields.name, 'https:/' + apiData.fields.symbolImage.fields.file.url)
  }
}
