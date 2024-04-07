import { Pipe, PipeTransform } from '@angular/core';
import {OmniMessageListObj} from "../services/whatsapp.service";
import moment from 'moment/moment';
import {formatDate} from "@angular/common";

@Pipe({
  standalone: true,
  name: 'addDateEntry',
  // pure: false,
})
export class AddDateEntryPipe implements PipeTransform{

  transform(value: OmniMessageListObj[], ...args): (OmniMessageListObj | string)[] {
    let currentDate = moment().add(1, 'days');
    const indexDateArray: {i: number, time: moment.Moment}[] = [];
    value.forEach((item, i) => {
      const time = moment(item.timestamp * 1000);
      if(!time.isSame(currentDate, 'day')){
        currentDate = time;
        indexDateArray.push({i, time});
      }
    });
    const returnValue: (OmniMessageListObj | string)[] = [...value];
    indexDateArray.forEach((item, i) => {
      let dateString: string;
      if(moment().isSame(moment(item.time.toDate()), 'day')){
        dateString = 'today';
      } else if (moment().subtract(1, "days").isSame(moment(item.time.toDate()), 'day')){
        dateString = 'yesterday';
      } else {
        dateString = formatDate(item.time.toDate(), 'dd.MM.yyyy', 'en-US');
      }
      returnValue.splice(item.i + i, 0, dateString);
    });
    return returnValue;
  }
}
