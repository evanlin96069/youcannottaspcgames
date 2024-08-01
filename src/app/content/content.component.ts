import { Component, PipeTransform, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

interface EntryData {
  title: string;
  author: string;
  date: string;
  videoId: string;
  game: string;
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
  imports: [SafePipe, FormsModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent {
  contentEntries: EntryData[] = [];
  filteredEntries: EntryData[] = [];
  sorted: boolean = true;
  selectedGame: string = 'All';

  url: string = '/assets/data.json';

  games: string[] = ['Portal', 'Portal 2', 'Quake', 'Half-Life'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<EntryData[]>(this.url).subscribe((res) => {
      this.contentEntries = res;
      this.filteredEntries = res;
      this.sortByDate();
    });
  }

  sortByDate() {
    this.sorted = !this.sorted;
    this.filteredEntries.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return this.sorted
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
  }

  filterByGame() {
    if (this.selectedGame === 'All') {
      this.filteredEntries = this.contentEntries;
    } else {
      this.filteredEntries = this.contentEntries.filter(
        (entry) => entry.game === this.selectedGame,
      );
    }
  }
}
