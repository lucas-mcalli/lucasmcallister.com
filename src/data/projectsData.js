import CarullaProject from '../components/CarullaProject';
import GGProject from '../components/GGProject';
import AtriumProject from '../components/AtriumProject';
import TrajectoryProject from '../components/TrajectoryProject';

export const projectsData = [
  {
    id: 'carulla',
    title: 'Carulla - Case Study',
    subtitle: 'Mobile app design',
    media: 'https://cdn.lucasmcallister.com/carulla/carulla_hero.mp4',
    mediaType: 'video',
    component: CarullaProject,
    disabled: false,
    extra: null
  },
    {
    id: 'trajectory',
    title: 'Trajectory',
    subtitle: 'Travel planning Chrome extension',
    media: 'https://cdn.lucasmcallister.com/trajectory/trajectory_cover.webp',
    mediaType: 'image',
    component: TrajectoryProject,
    disabled: false,
    extra: {
      info: 'Get the extension',
      link: 'https://chromewebstore.google.com/detail/checafmdbhhjpgibeihemgiafnoleooe?utm_source=item-share-cb'
    } 
  },
  {
    id: 'atrium',
    title: 'Atrium',
    subtitle: 'Event hosting web-app',
    media: 'https://cdn.lucasmcallister.com/atrium/atrium_cover.webp',
    mediaType: 'image',
    component: AtriumProject,
    disabled: false,
    extra: null
  },
  {
    id: 'gator gaming',
    title: 'Gator Gaming - Design Team',
    titleMobile: 'Gator Gaming',
    subtitle: 'Website redesign',
    media: 'https://cdn.lucasmcallister.com/gator-gaming/gatorgaming_cover.webp',
    mediaType: 'image',
    component: GGProject,
    disabled: false,
    extra: null
  }
];
