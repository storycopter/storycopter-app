import { darken, lighten } from "polished";

export const colors = {
  hexArray: [
    // https://www.colorbox.io/#steps=21#hue_start=0#hue_end=359#hue_curve=easeInOutQuad#sat_start=100#sat_end=100#sat_curve=easeOutCirc#sat_rate=200#lum_start=70#lum_end=70#lum_curve=easeOutQuad
    darken(0.06, "#b30800"),
    darken(0.06, "#b31800"),
    darken(0.06, "#b33300"),
    darken(0.06, "#b35800"),
    darken(0.06, "#b38a00"),
    darken(0.06, "#9db300"),
    darken(0.06, "#53b300"),
    darken(0.06, "#00b303"),
    darken(0.06, "#00b360"),
    darken(0.06, "#00a4b3"),
    darken(0.06, "#0045b3"),
    darken(0.06, "#1400b3"),
    darken(0.06, "#6300b3"),
    darken(0.06, "#a700b3"),
    darken(0.06, "#b30085"),
    darken(0.06, "#b30058")
  ],

  monoWt: lighten(0.48, "#767269"),
  monoHL: lighten(0.36, "#767269"),
  monoLt: lighten(0.24, "#767269"),
  monoLLt: lighten(0.12, "#767269"),
  monoM: "#767269",
  monoHD: darken(0.12, "#767269"),
  monoD: darken(0.24, "#767269"),
  monoLD: darken(0.36, "#767269"),
  monoBlk: darken(0.48, "#767269"),

  flareWt: "rgba(255,255,255,.07)",
  flareHL: "rgba(255,255,255,.17375)",
  flareLt: "rgba(255,255,255,.2775)",
  flareLLt: "rgba(255,255,255,.38125)",
  flareM: "rgba(255,255,255,.485)",
  flareHD: "rgba(255,255,255,.58875)",
  flareD: "rgba(255,255,255,.6925)",
  flareLD: "rgba(255,255,255,.79625)",
  flareBlk: "rgba(255,255,255,.9)",

  shadowWt: "rgba(0,0,0,.07)",
  shadowHL: "rgba(0,0,0,.17375)", // 0,07+((0,83/8)*1)
  shadowLt: "rgba(0,0,0,.2775)",
  shadowLLt: "rgba(0,0,0,.38125)",
  shadowM: "rgba(0,0,0,.485)",
  shadowHD: "rgba(0,0,0,.58875)",
  shadowD: "rgba(0,0,0,.6925)",
  shadowLD: "rgba(0,0,0,.79625)",
  shadowBlk: "rgba(0,0,0,.9)"
};

export const color = colors;
