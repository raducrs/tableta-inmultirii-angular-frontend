import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ColorHelper } from '@swimlane/ngx-charts';
import { SchoolPointsState } from '../state/schools.model';
import { select, Store } from '@ngrx/store';
import {
  selectLatestSource,
  selectSchoolPoints,
  selectSchoolsLoading
} from '../state/schools.selectors';
import { actionSchoolsDataPointsRetrieve } from '../state/schools.actions';
import { SchoolDataPoint, Source } from '../scenario-data';
import * as moment from 'moment';
import { PlatformService } from '../../../core/ssr/platform.service';

export const monthToShort = {
  1: 'ian',
  2: 'feb',
  3: 'mar',
  4: 'apr',
  5: 'mai',
  6: 'iun',
  7: 'iul',
  8: 'aug',
  9: 'sep',
  10: 'oct',
  11: 'noi',
  12: 'dec'
};

@Component({
  selector: 'anms-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class GlobalComponent implements OnInit {
  todayData = [
    {
      name: 'S3',
      value: 0
    },
    {
      name: 'S2',
      value: 0
    },
    {
      name: 'S1',
      value: 0
    }
  ];
  todayTotal = 1;

  todayS3Data = [
    {
      name: 'S3 COVID-19',
      value: 0
    },
    {
      name: 'S3 Incidenta',
      value: 0
    }
  ];
  todayS3Total = 1;

  dataSetsTime = [];

  colorScheme = {
    domain: ['#8e0000', '#d32f2f', '#ff9800', '#C7B42C', '#00701a']
  };

  colorSchemeToday = {
    domain: ['#8e0000', '#C7B42C', '#00701a']
  };

  colorSchemeS3 = {
    domain: ['#d32f2f', '#ff9800']
  };

  legendColors;
  legendColorsS3;

  activeEntries = [];

  latestSource;

  isLoading = false;
  updates: SchoolDataPoint[] = [];
  yScaleMax = 0;
  xScaleMax;
  referenceLines = [
    {
      name: 'Deschidere an școlar',
      value: new Date(2020, 9, 14)
    },
    {
      name: 'București scenariu roșu',
      value: new Date(2020, 10, 20)
    }
  ];

  isBroswer = false;

  constructor(
    private store: Store<SchoolPointsState>,
    private platform: PlatformService
  ) {
    this.isBroswer = platform.isBrowser;
  }

  ngOnInit(): void {
    this.store.dispatch(actionSchoolsDataPointsRetrieve());

    this.store.pipe(select(selectSchoolsLoading)).subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    this.store.pipe(select(selectLatestSource)).subscribe((latestSource) => {
      // TODO secure http link
      if (latestSource) {
        const utcDate = this.converToDateTimeobject(latestSource.accessed);
        const localDate = new Date(
          utcDate.getTime() - new Date().getTimezoneOffset() * 60000
        );
        this.latestSource = {
          name: latestSource.name,
          url: latestSource.url,
          accessed: localDate
        };
      }
    });

    this.store.pipe(select(selectSchoolPoints)).subscribe((schoolPoints) => {
      if (schoolPoints && schoolPoints.length > 0) {
        this.updates = schoolPoints;
        let latest = { date: '' } as SchoolDataPoint;
        const red = [];
        const redCovid = [];
        const redLockdown = [];
        const yellow = [];
        const green = [];
        schoolPoints.forEach((sc) => {
          const date = this.converToDateobject(sc.date);
          if (sc.date > latest.date) {
            latest = sc;
          }
          red.push({ name: date, value: sc.stats.red.count });
          redCovid.push({ name: date, value: sc.stats.redCovid.count });
          redLockdown.push({ name: date, value: sc.stats.redLockdown.count });
          yellow.push({ name: date, value: sc.stats.yellow.count });
          green.push({ name: date, value: sc.stats.green.count });
          if (sc.stats.green.count > this.yScaleMax) {
            this.yScaleMax = sc.stats.green.count + 1000;
          }
        });
        const latDate = this.converToDateobject(latest.date);
        latDate.setDate(latDate.getDate() + 2);
        this.xScaleMax = latDate;
        this.todayData = [
          { name: 'S3', value: latest.stats.red.count },
          { name: 'S2', value: latest.stats.yellow.count },
          { name: 'S1', value: latest.stats.green.count }
        ];
        this.todayTotal =
          latest.stats.red.count +
          latest.stats.yellow.count +
          latest.stats.green.count;
        if (this.todayTotal < 1) {
          this.todayTotal = 1;
        }
        this.todayS3Data = [
          { name: 'S3 COVID-19', value: latest.stats.redCovid.count },
          { name: 'S3 Incidenta', value: latest.stats.redLockdown.count }
        ];
        this.todayS3Total = latest.stats.red.count;
        if (this.todayS3Total < 1) {
          this.todayS3Total = 1;
        }
        this.dataSetsTime = [
          { name: 'S3', series: red },
          { name: 'S3 COVID-19', series: redCovid },
          { name: 'S3 Incidenta', series: redLockdown },
          { name: 'S2', series: yellow },
          { name: 'S1', series: green }
        ];
      }
    });
    this.createLegendColors();
  }

  private createLegendColors() {
    const domain = this.todayData.map((d) => d.name);
    const domainS3 = this.todayS3Data.map((d) => d.name);
    this.legendColors = new ColorHelper(
      this.colorSchemeToday,
      'ordinal',
      domain,
      undefined
    );
    this.legendColorsS3 = new ColorHelper(
      this.colorSchemeS3,
      'ordinal',
      domainS3,
      undefined
    );
  }

  public toDate(date: Date) {
    return `${date.getDate()} ${monthToShort[date.getMonth() + 1]}`;
  }

  private converToDateTimeobject(obj: any) {
    if (obj instanceof Date) {
      return obj;
    }
    if (obj.dayOfMonth) {
      return new Date(
        obj.year,
        obj.monthValue,
        obj.dayOfMonth,
        obj.hour,
        obj.minute,
        obj.second
      );
    }
    if (typeof obj === 'string' || obj instanceof String) {
      return moment(obj as string, 'YYYY-MM-DDTHH:mm:ss').toDate();
    }

    return undefined;
  }

  public converToDateobject(obj: any): Date {
    if (obj instanceof Date) {
      return obj;
    }
    if (obj.dayOfMonth) {
      return new Date(obj.year, obj.monthValue, obj.dayOfMonth, 12, 0, 0);
    }
    if (typeof obj === 'string' || obj instanceof String) {
      return moment(obj as string, 'YYYY-MM-DD').toDate();
    }

    return undefined;
  }
}
