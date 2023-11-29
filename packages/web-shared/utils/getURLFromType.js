import slugify from './slugify';

/**
 * note : Added additional check for title. If no title exist in the related node, pass in a separate title
 */

function getURLFromType(node) {
  const [type, randomId] = node?.id?.split(':');

  switch (type) {
    case 'EventContentItem':
    case 'InformationalContentItem':
    case 'MediaContentItem':
    case 'WeekendContentItem':
    case 'UniversalContentItem':
    case 'ContentChannel':
    case 'FeatureFeed':
    case 'Livestream':
    case 'ContentSeriesContentItem': {
      // We use the title to create a slug, if possible.
      // This helps SEO
      if (node.title) {
        return `${slugify(node.title)}-${btoa(`${type}-${randomId}`)}`;
      }
      return `${type}-${randomId}`;
    }
    case 'Url': {
      return node.url;
    }
    default: {
      console.warn(
        `Routing for node type ${type} not set up. Please add it to getURLFromType.js`
      );
      return '/';
    }
  }
}

export default getURLFromType;
