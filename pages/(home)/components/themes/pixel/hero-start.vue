<template>
  <!-- Pixel theme: SVG filters that redraw the hero photo as 8-bit art.
       pixel.css applies them through --photo-filter. Each filter averages the
       photo a little (blur), samples one 2x2 dot per tile, grows each dot to
       fill its tile (feMorphology) and cuts the colors to 6 levels per
       channel. Large: 6px tiles for the portrait. Small: 4px for the phone
       avatar. -->
  <svg class="absolute h-0 w-0 overflow-hidden" width="0" height="0" aria-hidden="true" focusable="false">
    <filter id="pixel-photo-lg" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feGaussianBlur stdDeviation="1.5" edgeMode="duplicate" result="soft" />
      <feFlood x="2" y="2" width="2" height="2" />
      <feComposite width="6" height="6" />
      <feTile result="dots" />
      <feComposite in="soft" in2="dots" operator="in" />
      <feMorphology operator="dilate" radius="2" />
      <feComponentTransfer>
        <feFuncR type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
        <feFuncG type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
        <feFuncB type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
      </feComponentTransfer>
    </filter>
    <filter id="pixel-photo-sm" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feGaussianBlur stdDeviation="0.8" edgeMode="duplicate" result="soft" />
      <feFlood x="1" y="1" width="2" height="2" />
      <feComposite width="4" height="4" />
      <feTile result="dots" />
      <feComposite in="soft" in2="dots" operator="in" />
      <feMorphology operator="dilate" radius="1" />
      <feComponentTransfer>
        <feFuncR type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
        <feFuncG type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
        <feFuncB type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
      </feComponentTransfer>
    </filter>
  </svg>
</template>
