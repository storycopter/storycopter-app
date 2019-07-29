import { darken, lighten } from 'polished';

export const colors = {
  monoWt: lighten(0.48, '#767269'),
  monoHL: lighten(0.36, '#767269'),
  monoLt: lighten(0.24, '#767269'),
  monoLLt: lighten(0.12, '#767269'),
  monoM: '#767269',
  monoHD: darken(0.12, '#767269'),
  monoD: darken(0.24, '#767269'),
  monoLD: darken(0.36, '#767269'),
  monoBlk: darken(0.48, '#767269'),

  flare100: 'rgba(255,255,255,.07)',
  flare200: 'rgba(255,255,255,.17375)',
  flare300: 'rgba(255,255,255,.2775)',
  flare400: 'rgba(255,255,255,.38125)',
  flare500: 'rgba(255,255,255,.485)',
  flare600: 'rgba(255,255,255,.58875)',
  flare700: 'rgba(255,255,255,.6925)',
  flare800: 'rgba(255,255,255,.79625)',
  flare900: 'rgba(255,255,255,.9)',

  shadow100: 'rgba(0,0,0,.07)',
  shadow200: 'rgba(0,0,0,.17375)', // 0,07+((0,83/8)*1)
  shadow300: 'rgba(0,0,0,.2775)',
  shadow400: 'rgba(0,0,0,.38125)',
  shadow500: 'rgba(0,0,0,.485)',
  shadow600: 'rgba(0,0,0,.58875)',
  shadow700: 'rgba(0,0,0,.6925)',
  shadow800: 'rgba(0,0,0,.79625)',
  shadow900: 'rgba(0,0,0,.9)',
};

export const color = colors;