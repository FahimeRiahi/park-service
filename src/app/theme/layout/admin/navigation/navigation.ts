import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
    {
    id: 'user-management',
    title: 'User Management',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'users',
        title: 'Users',
        type: 'item',
        url: '/tbl-bootstrap/bt-basic',
        classes: 'nav-item',
        icon: 'feather icon-box'
      }
    ]
  },
  {
    id: 'cars',
    title: 'Car Management',
    type: 'group',
    icon: 'feather icon-layout',
    children: [
      {
        id: 'white-list-cars',
        title: 'Whitelist Cars',
        type: 'item',
        url: '/tbl-bootstrap/whitelist-car',
        classes: 'nav-item',
        icon: 'feather icon-layers'
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
