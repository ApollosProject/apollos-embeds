import DOMPurify from 'dompurify';
import { useCallback } from 'react';
import useLink from './useLink';

const useDescriptionHTML = () => {
  const transformLink = useLink();

  const parseDescriptionHTML = useCallback(
    (descriptionHTML, options) => {
      const { useRockAuth, sanitizeOptions } = options || {};
      const sanitizedHTML = DOMPurify.sanitize(descriptionHTML, sanitizeOptions);

      const parser = new DOMParser();
      const doc = parser.parseFromString(sanitizedHTML, 'text/html');

      const anchorTags = doc.getElementsByTagName('a');

      for (let i = 0; i < anchorTags.length; i++) {
        const anchorTag = anchorTags[i];
        const link = anchorTag.getAttribute('href');

        if (!link || !link.startsWith('http')) continue;

        const href = transformLink(link, { useRockAuth });

        // setting `target` to `href` here will use an existing tab and refresh
        // if clicked again (instead of a brandn new tab everytime)
        anchorTag.setAttribute('href', href);
        anchorTag.setAttribute('target', href);
        anchorTag.setAttribute('rel', 'noopener noreferrer');

        // apply styles
        anchorTag.style.color = '#00A8E1';
        anchorTag.style.fontWeight = '600';
        anchorTag.style.textDecoration = 'underline';
      }

      return doc.body.innerHTML;
    },
    [transformLink],
  );

  return parseDescriptionHTML;
};

export default useDescriptionHTML;
