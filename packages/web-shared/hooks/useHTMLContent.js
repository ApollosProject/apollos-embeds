import DOMPurify from 'dompurify';
import { useCallback } from 'react';
import useLink from './useLink';

const useHTMLContent = () => {
  const transformLink = useLink();

  const parseHTMLContent = useCallback(
    (descriptionHTML, options) => {
      const { useRockAuth, sanitizeOptions } = options || {};
      const sanitizedHTML = DOMPurify.sanitize(descriptionHTML, sanitizeOptions);

      const parser = new DOMParser();
      const doc = parser.parseFromString(sanitizedHTML, 'text/html');

      const transformAnchorTag = anchorTag => {
        if (!anchorTag) return;

        const link = anchorTag.getAttribute('href');

        if (!link || !link.startsWith('http')) return;

        const href = transformLink(link, { useRockAuth });

        // setting `target` to `href` here will use an existing tab and refresh
        // if clicked again (instead of a brandn new tab everytime)
        anchorTag.setAttribute('href', href);
        anchorTag.setAttribute('target', href);
        anchorTag.setAttribute('rel', 'noopener noreferrer');

        // apply styles
        anchorTag.style.textDecoration = 'underline';
      };

      const anchorTags = doc.getElementsByTagName('a') || [];

      for (let i = 0; i < anchorTags.length; i++) {
        transformAnchorTag(anchorTags[i]);
      }

      return doc.body.innerHTML;
    },
    [transformLink],
  );

  return parseHTMLContent;
};

export default useHTMLContent;
