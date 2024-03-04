function test() {
  const ep = () => Math.floor(Math.random() * 10) & 1;
  return ep() | ep();
}
