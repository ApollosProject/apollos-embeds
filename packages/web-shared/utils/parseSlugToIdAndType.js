// Matches
// UniversalContentItem-669fe5d3-9753-4a8e-8f1e-1603bc3cc04e
// FeatureFeed-cc9c554e-7e37-450b-8707-2bb0434ebca6
// FeatureFeed-VW5pdmVyc2FsQ29udGVudEl0ZW0tNjY5ZmU1ZDMtOTc1My00YThlLThmMWUtMTYwM2JjM2NjMDRl

// Non-Matches
// a-word-from-john-VW5pdmVyc2FsQ29udGVudEl0ZW0tNjY5ZmU1ZDMtOTc1My00YThlLThmMWUtMTYwM2JjM2NjMDRl
// mens-breakfast-VW5pdmVyc2FsQ29udGVudEl0ZW0tYTA1Mzk4YjQtNzBjZi00MjhjLWI4NWMtYWRhYjEzNDhlZTgx

const uuidRegex = /^[A-Z](\w)+\-/;

const parseSlugToIdAndType = (url) => {
  if (!url) return null;

  const isUuid = uuidRegex.test(url);

  if (!isUuid) {
    const apollosIdEncoded = url.split('-').at(-1);
    const apollosId = atob(apollosIdEncoded);
    const [type, randomId] = apollosId?.split(/-(.*)/s) ?? [];
    if (type && randomId) return { type, randomId };
  } else {
    const [type, randomId] = url?.split(/-(.*)/s) ?? [];
    if (type && randomId) return { type, randomId };
  }
};

export default parseSlugToIdAndType;
