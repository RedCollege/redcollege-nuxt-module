export interface MenuGroup {
    groupLabel: string;
    menus: ISidebarMenu[];
}

export interface ISidebarMenu {
    href: string;
    label: string;
    active: boolean;
    icon?: string;
    submenus?: ISidebarMenu[]
}
