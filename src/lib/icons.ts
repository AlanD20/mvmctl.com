import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRight,
  faBookOpen,
  faBoxArchive,
  faCheck,
  faCircleInfo,
  faCodeBranch,
  faCopy,
  faDownload,
  faFileCode,
  faGear,
  faHouse,
  faLayerGroup,
  faLink,
  faBars,
  faMicrochip,
  faNetworkWired,
  faPlay,
  faRocket,
  faServer,
  faTerminal,
  faWandMagicSparkles,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinux,
  faUbuntu,
} from "@fortawesome/free-brands-svg-icons";

export const icons = {
  arrowRight: faArrowRight,
  book: faBookOpen,
  archive: faBoxArchive,
  check: faCheck,
  info: faCircleInfo,
  branch: faCodeBranch,
  copy: faCopy,
  download: faDownload,
  fileCode: faFileCode,
  gear: faGear,
  home: faHouse,
  layers: faLayerGroup,
  link: faLink,
  bars: faBars,
  chip: faMicrochip,
  network: faNetworkWired,
  play: faPlay,
  rocket: faRocket,
  server: faServer,
  terminal: faTerminal,
  sparkles: faWandMagicSparkles,
  spanner: faWrench,
  github: faGithub,
  ubuntu: faUbuntu,
  arch: faLinux,
} as const;

export type IconName = keyof typeof icons;

export const getIcon = (name: IconName): IconDefinition => icons[name];
