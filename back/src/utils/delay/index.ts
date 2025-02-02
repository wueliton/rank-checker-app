async function delay(seconds: number) {
  return await new Promise<void>((resolve) =>
    setTimeout(() => resolve(), 1000 * seconds)
  );
}

export default delay;
