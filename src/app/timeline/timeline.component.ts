import { Component, PipeTransform, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title, DomSanitizer } from '@angular/platform-browser';

const title = 'You Cannot TAS PC Games';

interface EntryData {
  title: string;
  author: string;
  year: string;
  videoId: string;
}

@Pipe({ name: 'safe', standalone: true })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(videoId: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + videoId,
    );
  }
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent {
  timelineEntries: any;

  url: string = '/assets/data.json';

  constructor(
    private http: HttpClient,
    private titleService: Title,
  ) {
    this.titleService.setTitle(title);
  }

  ngOnInit() {
    this.http.get(this.url).subscribe((res) => {
      this.timelineEntries = res;
    });
  }
}
