export const getChurchSlug = (host) => {
  return 'cedar_creek';
  let subdomain =
    process.env.NODE_ENV === 'production'
      ? host.split('.').slice(0, -2).join('.')
      : host.split('.').slice(0, -1).join('.');

  if (process.env.NODE_ENV !== 'production' && !subdomain) {
    subdomain = 'cedar-creek';
  }
  return subdomain.replace(/-/g, '_');
};
