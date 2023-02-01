function px(target, context = 16) {
  const targetValue = target.split('rem')[0];
  const value = targetValue * context;

  return String(`${value}px`);
}

export default px;
