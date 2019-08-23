import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RankDto } from '../dtos/rank_dto.model';
import { Entry } from 'contentful';

@Injectable({
  providedIn: 'root'
})
export class RankService {

  constructor(private apiService: ApiService) { }

  public async getRanks() {
      let rankData = await this.apiService.getEntriesByType('rank') as Entry<any>[];
      let ranks: RankDto[] = [];
      rankData.forEach((rank: Entry<any>) => {
        ranks.push(this.buildRankDtoFromApiData(rank));
      });
      return ranks;
  }

  public buildRankDtoFromApiData(apiData: Entry<any>): RankDto {
    return new RankDto(apiData.sys.id, apiData.fields.name, 'https:/' + apiData.fields.symbolImage.fields.file.url)
  }
}
