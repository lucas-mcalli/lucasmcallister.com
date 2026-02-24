import CarullaProject from '../components/CarullaProject';
import GGProject from '../components/GGProject';
import AtriumProject from '../components/AtriumProject';

export const projectsData = [
  {
    id: 'atrium',
    title: 'Atrium',
    subtitle: 'event hosting web-app',
    image: '/ATRIUM_LOGO.png',
    component: AtriumProject,
    disabled: false,
  },
  {
    id: 'carulla',
    title: 'Carulla - Case Study',
    subtitle: 'mobile app design',
    image: '/carulla_wireframe_cropped.webp',
    component: CarullaProject,
    disabled: false,
  },
  {
    id: 'gator gaming',
    title: 'Gator Gaming - Design Team',
    titleMobile: 'Gator Gaming',
    subtitle: 'website redesign',
    image: '/gatorgaming_cover.webp',
    component: GGProject,
    disabled: false,
  },
];
