import rem from '../rem';

test('it should turn a pixel value into a rem', () => {
  //default platform is ios
  expect(rem('12px')).toEqual('16px');
  expect(rem('18px')).toEqual('24px');
});
