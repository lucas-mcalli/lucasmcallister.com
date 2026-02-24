import CarullaProject from '../components/CarullaProject';
import GGProject from '../components/GGProject';
import AtriumProject from '../components/AtriumProject';

export const projectsData = [
  {
    id: 'atrium',
    title: 'Atrium',
    subtitle: 'event hosting web-app',
    media: '/atrium_cover.png',
    component: AtriumProject,
    disabled: true,
  },
  {
    id: 'carulla',
    title: 'Carulla - Case Study',
    subtitle: 'mobile app design',
    media: '/carulla_wireframe_cropped.webp',
    component: CarullaProject,
    disabled: true,
  },
  {
    id: 'gator gaming',
    title: 'Gator Gaming - Design Team',
    titleMobile: 'Gator Gaming',
    subtitle: 'website redesign',
    media: '/gatorgaming_cover.webp',
    component: GGProject,
    disabled: false,
  },
];
