import { Component, PipeTransform, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

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
  selector: 'app-content',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent {
  contentEntries: any;

  url: string = '/assets/data.json';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.url).subscribe((res) => {
      this.contentEntries = res;
    });
  }
}
