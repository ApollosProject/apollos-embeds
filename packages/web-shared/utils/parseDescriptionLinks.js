// //Check if string contains links
import DOMPurify from 'dompurify';
import { parseLink } from '.';

export default function parseDescription(description) {
  const sanitizedHTML = DOMPurify.sanitize(description);

  const parser = new DOMParser();
  const doc = parser.parseFromString(sanitizedHTML, 'text/html');

  const anchorTags = doc.getElementsByTagName('a');
  for (let i = 0; i < anchorTags.length; i++) {
    const anchorTag = anchorTags[i];
    const href = anchorTag.getAttribute('href');

    if (!href || !href.startsWith('http')) continue;

    parseLink(href);

    anchorTag.style.color = 'blue';
    anchorTag.setAttribute('target', '_blank');
    anchorTag.setAttribute('rel', 'noopener noreferrer');
    anchorTag.style.textDecoration = 'underline';
  }

  return doc.body.innerHTML;
}
