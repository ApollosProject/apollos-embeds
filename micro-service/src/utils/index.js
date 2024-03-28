export const getChurchSlug = (host) => {
  let subdomain =
    process.env.NODE_ENV === 'production'
      ? host.split('.').slice(0, -2).join('.')
      : host.split('.').slice(0, -1).join('.');

  if (process.env.NODE_ENV !== 'production' && !subdomain) {
    subdomain = 'apollos-demo';
  }
  return subdomain.replace(/-/g, '_');
};
