const colors = {
  dark: {
    // These colors are the same across light and dark themes, and serve
    // as the default set that all other colors are based off of.
    base: {
      primary: '#00676D',
      secondary: '#17B582',
      tertiary: '#6EC5B8',
      gray: '#8E8E93',
      black: '#000000',
      white: '#FFFFFF',
      alert: '#C64F55',
      warning: '#F4B740',
      success: '#17B569',
      wordOfChrist: '#8B0000',
      live: '#cb1114',
    },
    neutral: {
      gray: '#8E8E93', // brand gray
      gray2: '#636366',
      gray3: '#48484A',
      gray4: '#3A3A3C',
      gray5: '#2C2C2E',
      gray6: '#1C1C1E',
    },
    fill: {
      paper: '#1C1C1E', // gray6
      paperTransparent: '#1C1C1E00', // 0% opacity gray6
      screen: '#000000',
      system: 'rgba(99, 99, 102, 0.36)', // 36% gray2
      system2: 'rgba(99, 99, 102, 0.32)', // 32% gray2
      system3: 'rgba(99, 99, 102, 0.24)', // 24% gray2
      system4: 'rgba(99, 99, 102, 0.18)', // 18% gray2
    },
    material: {
      thick: 'rgba(28, 28, 30, 0.90)', // 90% paper
      regular: 'rgba(28, 28, 30, 0.70)', // 70% paper
      thin: 'rgba(28, 28, 30, 0.50)', // 50% paper
      ultrathin: 'rgba(28, 28, 30, 0.40)', // 40% paper
      chrome: 'rgba(28, 28, 30, 0.95)', // 95% paper
    },
    text: {
      primary: '#F4F7F8',
      secondary: 'rgba(244, 247, 248, 0.6)', // 60% primary
      tertiary: 'rgba(244, 247, 248, 0.33)', // 33% primary
      quaternary: 'rgba(244, 247, 248, 0.18)', // 18% primary
      placeholder: 'rgba(244, 247, 248, 0.3)', // 30% primary
      action: '#17B582', // brand secondary
    },
  },
  light: {
    // These colors are the same across light and dark themes, and serve
    // as the default set that all other colors are based off of.
    base: {
      primary: '#00676D',
      secondary: '#17B582',
      tertiary: '#6EC5B8',
      gray: '#8E8E93',
      black: '#000000',
      white: '#FFFFFF',
      alert: '#C64F55',
      warning: '#F4B740',
      success: '#17B569',
      wordOfChrist: '#8B0000',
      live: '#cb1114',
    },
    neutral: {
      gray: '#8E8E93',
      gray2: '#AFAFB3',
      gray3: '#C7C7CC',
      gray4: '#D1D1D6',
      gray5: '#E5E5EA',
      gray6: '#F2F2F7',
    },
    fill: {
      paper: '#FFFFFF',
      screen: '#F9F9FB', // 50% gray6
      system: 'rgba(142, 142, 147, 0.2)', // 20% gray
      system2: 'rgba(142, 142, 147, 0.16)', // 16% gray
      system3: 'rgba(142, 142, 147, 0.12)', // 12% gray
      system4: 'rgba(142, 142, 147, 0.08)', // 8% gray
    },
    text: {
      primary: '#27272E',
      secondary: 'rgba(39, 39, 46, 0.6)', // 60% primary
      tertiary: 'rgba(39, 39, 46, 0.3)', // 30% primary
      quaternary: 'rgba(39, 39, 46, 0.18)', // 18% primary
      placeholder: 'rgba(229, 229, 234, 0.3)', // 30% gray5
      action: '#17B582', // brand secondary
    },
    shadow: {
      low: '0px 2px 8px rgba(0, 0, 0, 0.04)',
      medium: '0px 5px 24px rgba(0, 0, 0, 0.05)',
      high: '0px 20px 48px rgba(0, 0, 0, 0.09)',
    },
  },
};

export default colors;
