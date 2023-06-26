import stripUnit from '../stripUnit';

test('it should remove units like px and rem from a numerical value', () => {
  expect(stripUnit('16px')).toEqual(16);
  expect(stripUnit('21.12px')).toEqual(21.12);
  expect(stripUnit('1.5rem')).toEqual(1.5);
  expect(stripUnit('3rem')).toEqual(3);
});
