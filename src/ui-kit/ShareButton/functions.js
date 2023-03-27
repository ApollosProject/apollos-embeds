export function shareLinkByEmail(link) {
  const subject = encodeURIComponent('Check this out on Apollos');
  const body = encodeURIComponent(`Hey, check out this post: ${link}`);
  const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
  window.location.href = mailtoLink;
}

export function shareLinkOnFacebook(link) {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    link
  )}`;
  window.open(url, '_blank', 'toolbar=0,location=0,menubar=0');
}

export function shareLinkOnTwitter(link) {
  const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    link
  )}`;
  window.open(url, '_blank', 'toolbar=0,location=0,menubar=0');
}

export function shareLinkOnLinkedIn(link) {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    link
  )}`;
  window.open(url, '_blank', 'toolbar=0,location=0,menubar=0');
}
