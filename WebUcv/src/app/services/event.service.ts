import { Injectable } from '@angular/core';
import { Observable, Subject, filter, map } from 'rxjs';

interface IEvent {
  type: string;
  data: any | null;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private message$ = new Subject<IEvent>();

  constructor() {}

  emit(type: string, data: any = null) {
    this.message$.next(<IEvent>{ type: type, data: data });
  }

  on(type: string): Observable<any> {
    return this.message$.pipe(
      filter((m) => m.type === type),
      map((m) => m.data)
    );
  }
}
