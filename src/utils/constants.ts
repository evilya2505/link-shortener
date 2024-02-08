import { TDisplayConfig } from "../utils/types";

export const DISPLAY_CONFIG: TDisplayConfig = {
    desktopLarge: {
        maxWidth: 1400,
        itemsPerPage: 10
    },
    desktop: {
        maxWidth: 1200,
        itemsPerPage: 8
    },
    tablet: {
        maxWidth: 768,
        itemsPerPage: 6
    },
    phoneLarge: {
        maxWidth: 480,
        itemsPerPage: 4
    }
};

export const SORTING_TYPES = {
    asc_short: 'asc_short', 
    asc_target: 'asc_target', 
    asc_counter: 'asc_counter', 
    desc_short: 'desc_short', 
    desc_target: 'desc_target', 
    desc_counter: 'desc_counter'
}