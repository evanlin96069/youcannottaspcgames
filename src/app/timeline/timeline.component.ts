import { Component, PipeTransform, Pipe } from '@angular/core';
import { Title, DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe', standalone: true })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(videoId: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + videoId,
    );
  }
}
const title = 'You Cannot TAS PC Games';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent {
  timelineEntries = [
    {
      title: 'Portal TAS in 5:13',
      author: 'Jukspa',
      year: '2016',
      videoId: 'W9gxFkOz2_4',
    },
    {
      title: 'Portal Inbounds TAS in 8:08.13',
      author: 'Jukspa',
      year: '2017',
      videoId: '31EICtrbmI0',
    },
    {
      title: 'Portal Prelude TAS in 1:46.47',
      author: 'Jukspa',
      year: '2018',
      videoId: '8tkezckKiQs',
    },
    {
      title: 'Portal Glitchless TAS in 13:30.03',
      author: 'Jukspa',
      year: '2019',
      videoId: 'jJqcEgLXNeo',
    },
    {
      title: 'Portal: The Flash Version Mappack TAS in 1:27.90',
      author: 'Pr0tal',
      year: '2019',
      videoId: 'SvroMRAj3q4',
    },
    {
      title: 'Portal 2 Co-op TAS in 14:02.017',
      author: 'P2TAS Team',
      year: '2019',
      videoId: 'tbKhToSKM64',
    },
    {
      title: 'Quake Easy Run TAS in 9:35.666',
      author: 'Jukspa',
      year: '2020',
      videoId: 'ekdcUOW1geA',
    },
    {
      title: 'Portal 2 Inbounds No SLA TAS in 47:13.033',
      author: 'P2TAS Team',
      year: '2022',
      videoId: 'MZi1dXwCqG8',
    },
    {
      title: 'Portal 2: Reverse Mod in 17:06.500',
      author: 'sear',
      year: '2022',
      videoId: '4SZ1pGIYGD8',
    },
    {
      title: 'P1 Done P2 Inbounds NoSLA in 9:56.550',
      author: 'lucasskywalker',
      year: '2022',
      videoId: 'fOA69T-Mo_0',
    },
    {
      title: 'Portal All Main Triggers TAS In 8:18.330',
      author: 'FluffyGMD',
      year: '2023',
      videoId: 'QCb91OmnR_I',
    },
    {
      title: 'Portal Glitchless TAS in 12:48.360s',
      author: 'ChrisUMB',
      year: '2023',
      videoId: 'zQsHq6vshOA',
    },
    {
      title: 'Portal 2 Reverse Mod in 16:04.100',
      author: 'sear',
      year: '2023',
      videoId: 'G7sTo7pqeds',
    },
    {
      title: 'Aperture Ireland Inbounds SLA in 8:57.650',
      author: 'sear',
      year: '2023',
      videoId: '7JURn5E98PU',
    },
    {
      title: 'Portal 2 Portal Placement Never Fail OOB No SLA TAS in 11:49.133',
      author: 'rudko',
      year: '2023',
      videoId: 'ovveca9Urww',
    },
    {
      title: 'Quake Nightmare TAS in 9:32.1337',
      author: 'Jukspa',
      year: '2023',
      videoId: 'vaHronUSF3g',
    },
    {
      title: 'Portal All Main Triggers TAS In 8:18.330',
      author: 'FluffyGMD',
      year: '2023',
      videoId: 'QCb91OmnR_I',
    },
    {
      title: 'Portal 2 - No Elements in 7:37.433',
      author: 'sear',
      year: '2024',
      videoId: 'ROu0YgZxYu4',
    },
  ];

  constructor(private titleService: Title) {
    this.titleService.setTitle(title);
  }
}
