const exhaustiveCheck = (value: never) => {
  console.log(`Processs this value: ${value}`);
  throw new Error(`Processs this value: ${value}`);
};

export { exhaustiveCheck };
