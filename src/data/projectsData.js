import CarullaProject from '../components/CarullaProject';
import GGProject from '../components/GGProject';
import AtriumProject from '../components/AtriumProject';

export const projectsData = [
  {
    id: 'atrium',
    title: 'Atrium',
    subtitle: 'Event hosting web-app',
    media: '/atrium_cover.webp',
    component: AtriumProject,
    disabled: false,
  },
  {
    id: 'gator gaming',
    title: 'Gator Gaming - Design Team',
    titleMobile: 'Gator Gaming',
    subtitle: 'Website redesign',
    media: '/gatorgaming_cover.webp',
    component: GGProject,
    disabled: false,
  },
  {
    id: 'carulla',
    title: 'Carulla - Case Study',
    subtitle: 'Mobile app design',
    media: '/carulla_wireframe_cropped.webp',
    component: CarullaProject,
    disabled: true,
  },
];
