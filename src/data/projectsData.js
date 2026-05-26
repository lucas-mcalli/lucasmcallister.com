import CarullaProject from '../components/CarullaProject';
import GGProject from '../components/GGProject';
import AtriumProject from '../components/AtriumProject';

export const projectsData = [
  {
    id: 'carulla',
    title: 'Carulla - Case Study',
    subtitle: 'Mobile app design',
    media: 'https://cdn.lucasmcallister.com/videos/carulla_hero.mp4',
    mediaType: 'video',
    component: CarullaProject,
    disabled: false,
  },
  {
    id: 'atrium',
    title: 'Atrium',
    subtitle: 'Event hosting web-app',
    media: '/atrium_cover.webp',
    mediaType: 'image',
    component: AtriumProject,
    disabled: false,
  },
  {
    id: 'gator gaming',
    title: 'Gator Gaming - Design Team',
    titleMobile: 'Gator Gaming',
    subtitle: 'Website redesign',
    media: '/gatorgaming_cover.webp',
    mediaType: 'image',
    component: GGProject,
    disabled: false,
  }
];
