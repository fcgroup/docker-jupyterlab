function respond(previousAnswers, visibleHats) {
  if (previousAnswers.length === 0) {
    return visibleHats.filter(x => x === 'blue').length % 2 === 0 ? 'blue' : 'green';
  }

  let expectedEven = previousAnswers[0] === 'blue' ? true : false;
  previousAnswers.slice(1).filter(x => x === 'blue').forEach(x => {
    expectedEven = !expectedEven;
  });
  const visibleEven = visibleHats.filter(x => x === 'blue').length % 2 === 0;

  return expectedEven === visibleEven ? 'green' : 'blue';
}
