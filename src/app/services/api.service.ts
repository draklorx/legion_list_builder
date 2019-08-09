import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { Faction } from '../models/faction.model';
//import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private client = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.token
  })

  constructor(
      //private httpClient: NativeScriptHttpClientModule
    ) { }
/*
  public getUnits(query?: object): Promise<Entry<any>[]> {
    return this.client.getEntries(Object.assign({
      content_type: 'unit'
    }, query))
    .then (result => result.items);
  }

  public getRanks(query?: object): Promise<Entry<any>[]> {
    return this.client.getEntries(Object.assign({
      content_type: 'rank'
    }, query))
    .then (result => result.items);
  }

  public getFactions(query?: object): Promise<Entry<any>[]> {
    return this.client.getEntries(Object.assign({
      content_type: 'faction'
    }, query))
    .then (result => result.items);
  }

  public getUnit(unitId): Promise<Entry<any>> {
    return this.client.getEntries(Object.assign({
      content_type: 'unit'
    }, {'sys.id': unitId}))
    .then (result => result.items[0]);
  }
  */
  public async getFactions(): Promise<Faction[]> {
    const result = await this.client.getEntries(Object.assign({
          content_type: 'faction'
      }));
      let factions: Faction[] = [];
      result.items.forEach((faction: Entry<any>) => {
          factions.push(new Faction(faction.sys.id, faction.fields.name, 'https:/' + faction.fields.symbolImage.fields.file.url));
      });
      return factions;
  }
}
