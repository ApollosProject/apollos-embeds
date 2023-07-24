import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as SCThemeProvider, withTheme } from 'styled-components';
import defaultTheme from '../_config/theme';
import { useCurrentChurch } from '../../hooks';
import { useSearch, set } from '../../providers/SearchProvider';

function ThemeProvider(props) {
  const [_colorScheme, setColorScheme] = useState('light');
  const [_colorTheme, setColorTheme] = useState({
    ...defaultTheme,
    // TODO: Fix light theme design before enabling theme switching
    // colors: props.theme.colors[_colorScheme],
    colors: {
      ...defaultTheme.colors.light,
      // only these three custom colors are currently supported
      base: {
        ...defaultTheme.colors.light.base,
        primary: defaultTheme.colors.light.base.primary,
        secondary: defaultTheme.colors.light.base.secondary,
        tertiary: defaultTheme.colors.light.base.tertiary,
      },
      text: {
        ...defaultTheme.colors.light.text,
        action: defaultTheme.colors.light.text.action,
      },
    },
  });
  const { currentChurch, loading } = useCurrentChurch();
  const [state, dispatch] = useSearch();

  useEffect(() => {
    dispatch(
      set({
        loading: loading,
      })
    );
  }, [loading]);

  useEffect(() => {
    if (currentChurch && currentChurch.theme) {
      const customTheme = JSON.parse(currentChurch?.theme);
      setColorTheme({
        ...defaultTheme,
        // TODO: Fix light theme design before enabling theme switching
        // colors: props.theme.colors[_colorScheme],
        colors: {
          ...defaultTheme.colors.light,
          // only these three custom colors are currently supported
          base: {
            ...defaultTheme.colors.light.base,
            primary:
              customTheme?.colors?.primary ||
              defaultTheme.colors.light.base.primary,
            secondary:
              customTheme?.colors?.secondary ||
              defaultTheme.colors.light.base.secondary,
            tertiary:
              customTheme?.colors?.tertiary ||
              defaultTheme.colors.light.base.tertiary,
          },
          text: {
            ...defaultTheme.colors.light.text,
            action:
              customTheme?.colors?.secondary ||
              defaultTheme.colors.light.text.action,
          },
        },
      });
    }
  }, [currentChurch]);

  return (
    <SCThemeProvider theme={_colorTheme}>{props.children}</SCThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

ThemeProvider.defaultProps = {
  theme: defaultTheme,
};

export default withTheme(ThemeProvider);
