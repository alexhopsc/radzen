/*
  This file is automatically generated. Any changes will be overwritten.
  Modify territories-by-region-id.component.ts instead.
*/
import { ChangeDetectorRef, ViewChild, AfterViewInit, Injector, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { DialogService, DIALOG_PARAMETERS, DialogRef } from '@radzen/angular/dist/dialog';
import { NotificationService } from '@radzen/angular/dist/notification';
import { ContentComponent } from '@radzen/angular/dist/content';
import { ButtonComponent } from '@radzen/angular/dist/button';
import { HeadingComponent } from '@radzen/angular/dist/heading';
import { GridComponent } from '@radzen/angular/dist/grid';
import { AddTerritoryComponent } from '../add-territory/add-territory.component';
import { EditTerritoryComponent } from '../edit-territory/edit-territory.component';

import { NorthwindService } from '../northwind.service';

export class TerritoriesByRegionIdGenerated implements AfterViewInit, OnInit, OnDestroy {
  // Components
  @ViewChild('content1') content1: ContentComponent;
  @ViewChild('button0') button0: ButtonComponent;
  @ViewChild('pageTitle') pageTitle: HeadingComponent;
  @ViewChild('grid0') grid0: GridComponent;

  router: Router;

  cd: ChangeDetectorRef;

  route: ActivatedRoute;

  notificationService: NotificationService;

  dialogService: DialogService;

  dialogRef: DialogRef;

  _location: Location;

  _subscription: Subscription;

  northwind: NorthwindService;

  getTerritoriesResult: any;

  getTerritoriesCount: any;

  territory: any;

  parameters: any;

  constructor(private injector: Injector) {
  }

  ngOnInit() {
    this.notificationService = this.injector.get(NotificationService);

    this.dialogService = this.injector.get(DialogService);

    this.dialogRef = this.injector.get(DialogRef, null);

    this.router = this.injector.get(Router);

    this.cd = this.injector.get(ChangeDetectorRef);

    this._location = this.injector.get(Location);

    this.route = this.injector.get(ActivatedRoute);

    this.northwind = this.injector.get(NorthwindService);
  }

  ngAfterViewInit() {
    this._subscription = this.route.params.subscribe(parameters => {
      if (this.dialogRef) {
        this.parameters = this.injector.get(DIALOG_PARAMETERS);
      } else {
        this.parameters = parameters;
      }
      this.load();
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }


  load() {
    this.northwind.getTerritories(`RegionID eq ${this.parameters.RegionID}`, this.grid0.allowPaging ? this.grid0.pageSize : null, this.grid0.allowPaging ? 0 : null, null, `Region`, this.grid0.allowPaging)
    .subscribe((result: any) => {
      this.getTerritoriesResult = result.value;

      this.getTerritoriesCount = this.grid0.allowPaging ? result['@odata.count'] : result.value.length;

      this.territory = result.value[0];
    }, (result: any) => {

    });
  }

  button0Click(event: any) {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.router.navigate(['regions-by-region-id', this.parameters.RegionID]);
  }

  grid0Add(event: any) {
    this.dialogService.open(AddTerritoryComponent, { parameters: {}, title: 'Add Territory' });
  }

  grid0Delete(event: any) {
    this.northwind.deleteTerritory(`${event.TerritoryID}`)
    .subscribe((result: any) => {
      this.notificationService.notify({ severity: "success", summary: `Success`, detail: `Territory deleted!` });
    }, (result: any) => {
      this.notificationService.notify({ severity: "error", summary: `Error`, detail: `Unable to delete Territory` });
    });
  }

  grid0LoadData(event: any) {
    this.northwind.getTerritories(`${event.filter ? event.filter + ' and ' : ''}RegionID eq ${this.parameters.RegionID}`, event.top, event.skip, `${event.orderby}`, `Region`, event.top != null && event.skip != null)
    .subscribe((result: any) => {
      this.getTerritoriesResult = result.value;

      this.getTerritoriesCount = event.top != null && event.skip != null ? result['@odata.count'] : result.value.length;
    }, (result: any) => {

    });
  }

  grid0RowSelect(event: any) {
    this.dialogService.open(EditTerritoryComponent, { parameters: {TerritoryID: event.TerritoryID}, title: 'Edit Territory' });
  }
}
