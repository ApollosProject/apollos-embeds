export const getChurchSlug = (host) => {
  let subdomain =
    process.env.NODE_ENV === 'production'
      ? host.split('.').slice(0, -2).join('.')
      : process.env.NEXT_PUBLIC_CHURCH_SLUG;

  if (process.env.NODE_ENV !== 'production' && !subdomain) {
    subdomain = 'apollos-demo';
  }
  return subdomain.replace(/-/g, '_');
};
