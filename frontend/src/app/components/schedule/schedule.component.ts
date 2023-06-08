import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {jqxSchedulerComponent} from "jqwidgets-ng/jqxscheduler";
import {AppointmentService} from "../../services/appointment/appointment.service";
import {map} from "rxjs";
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

import {
  AgendaService, DayService, EventSettingsModel,
  MonthAgendaService, MonthService,
  TimelineMonthService,
  TimelineViewsService, View, WeekService, WorkWeekService
} from "@syncfusion/ej2-angular-schedule";

import { L10n, loadCldr } from '@syncfusion/ej2-base';


L10n.load({
  "uk-UK": {
    "schedule": {
      "day": "День",
      "week": "Тиждень",
      "workWeek": "Робочий тиждень",
      "month": "Month",
      "year": "Year",
      "agenda": "Agenda",
      "weekAgenda": "Week Agenda",
      "workWeekAgenda": "Work Week Agenda",
      "monthAgenda": "Month Agenda",
      "today": "Today",
      "noEvents": "No events",
      "emptyContainer": "There are no events scheduled on this day.",
      "allDay": "All day",
      "start": "Початок",
      "end": "Кінець",
      "more": "more",
      "close": "Close",
      "cancel": "Cancel",
      "noTitle": "(No Title)",
      "delete": "Delete",
      "deleteEvent": "This Event",
      "deleteMultipleEvent": "Delete Multiple Events",
      "selectedItems": "Items selected",
      "deleteSeries": "Entire Series",
      "edit": "Edit",
      "editSeries": "Entire Series",
      "editEvent": "This Event",
      "createEvent": "Create",
      "subject": "Subject",
      "addTitle": "Add title",
      "moreDetails": "More Details",
      "save": "Save",
      "editContent": "How would you like to change the appointment in the series?",
      "deleteContent": "Are you sure you want to delete this event?",
      "deleteMultipleContent": "Are you sure you want to delete the selected events?",
      "newEvent": "New Event",
      "title": "Title",
      "location": "Location",
      "description": "Description",
      "timezone": "Timezone",
      "startTimezone": "Start Timezone",
      "endTimezone": "End Timezone",
      "repeat": "Repeat",
      "saveButton": "Save",
      "cancelButton": "Cancel",
      "deleteButton": "Delete",
      "recurrence": "Recurrence",
      "wrongPattern": "The recurrence pattern is not valid.",
      "seriesChangeAlert": "Do you want to cancel the changes made to specific instances of this series and match it to the whole series again?",
      "createError": "The duration of the event must be shorter than how frequently it occurs. Shorten the duration, or change the recurrence pattern in the recurrence event editor.",
      "sameDayAlert": "Two occurrences of the same event cannot occur on the same day.",
      "editRecurrence": "Edit Recurrence",
      "repeats": "Repeats",
      "alert": "Alert",
      "startEndError": "The selected end date occurs before the start date.",
      "invalidDateError": "The entered date value is invalid.",
      "blockAlert": "Events cannot be scheduled within the blocked time range.",
      "ok": "Ok",
      "yes": "Yes",
      "no": "No",
      "occurrence": "Occurrence",
      "series": "Series",
      "previous": "Previous",
      "next": "Next",
      "timelineDay": "Timeline Day",
      "timelineWeek": "Таймлайн тижня",
      "timelineWorkWeek": "Timeline Work Week",
      "timelineMonth": "Timeline Month",
      "timelineYear": "Timeline Year",
      "editFollowingEvent": "Following Events",
      "deleteTitle": "Delete Event",
      "editTitle": "Edit Event",
      "beginFrom": "Begin From",
      "endAt": "End At",
      "expandAllDaySection": "Expand-all-day-section",
      "collapseAllDaySection": "Collapse-all-day-section"
    },
    "recurrenceeditor": {
      "none": "None",
      "daily": "Daily",
      "weekly": "Weekly",
      "monthly": "Monthly",
      "month": "Month",
      "yearly": "Yearly",
      "never": "Never",
      "until": "Until",
      "count": "Count",
      "first": "First",
      "second": "Second",
      "third": "Third",
      "fourth": "Fourth",
      "last": "Last",
      "repeat": "Repeat",
      "repeatEvery": "Repeat every",
      "on": "Repeat On",
      "end": "End",
      "onDay": "Day",
      "days": "Day(s)",
      "weeks": "Week(s)",
      "months": "Month(s)",
      "years": "Year(s)",
      "every": "every",
      "summaryTimes": "time(s)",
      "summaryOn": "on",
      "summaryUntil": "until",
      "summaryRepeat": "Repeats",
      "summaryDay": "day(s)",
      "summaryWeek": "week(s)",
      "summaryMonth": "month(s)",
      "summaryYear": "year(s)",
      "monthWeek": "Month Week",
      "monthPosition": "Month Position",
      "monthExpander": "Month Expander",
      "yearExpander": "Year Expander",
      "repeatInterval": "Repeat Interval"
    }
  }
});
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService],
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
  public data: any[] = [];
  public weekFirstDay: number =2;
  public workWeekDays: number[] = [2, 3,4, 5,6];
  public timeFormat: string = "HH:mm";
   constructor(private service: AppointmentService) {}

   ngOnInit() {
     this.service.getAll().subscribe(appointments => {
       appointments.forEach(appointmentData => {
         appointmentData.start = new Date(appointmentData.startTime);
         appointmentData.end = new Date(appointmentData.endTime);
       });
       this.data = appointments;
       console.log(this.data);

       this.eventSettings = {
         dataSource: this.data,
         allowDeleting: true,

       };
     });
   }

   selectedDate = new Date();
   public eventSettings: EventSettingsModel = {
        dataSource: this.data,
        allowDeleting: true,

      timeFormat: 'HH:mm',
        fields: {
          id: 'id',
          subject: {title: 'Тип прийому', name: 'appointmentType' },
          //@ts-ignore
          isAllDay: false,
          location: { title: 'Лікар', name: 'doctor.id' },
          //@ts-ignore
          description: { title: 'Опис',name:'description'},
          startTime: { title: 'Початок',name: 'startTime' },
          endTime: { title: 'Кінець',name: 'endTime' }
        }
  };
}
