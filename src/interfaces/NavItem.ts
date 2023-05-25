interface BaseNavItem {
  order: number;
  path?: string;
  label: string;
}

export interface NavItem extends BaseNavItem {
  icon: JSX.Element;
  toggleSidebar?: boolean;
  subItems?: SubNavItem[];
}

export interface SubNavItem extends BaseNavItem {}
