function solve() {
  if (powerOn(0, 1)) {
    return [0, 1];
  }
  if (powerOn(0, 2)) {
    return [0, 2];
  }
  if (powerOn(1, 2)) {
    return [1, 2];
  }
  if (powerOn(3, 4)) {
    return [3, 4];
  }
  if (powerOn(3, 5)) {
    return [3, 5];
  }
  if (powerOn(4, 5)) {
    return [4, 5];
  }
  return [6, 7];
}
