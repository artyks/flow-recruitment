const handleError = (error: unknown) => {
  if (error instanceof Error) {
    alert(error.message);
  }
  console.error(error);
};

export { handleError };
