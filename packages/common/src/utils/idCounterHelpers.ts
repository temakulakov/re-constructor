export const createCounter = () => {
  let counterId = 0;

  const getCurrent = (): number => counterId;

  const increment = (): number => {
    counterId += 1;

    return counterId;
  };

  const reset = (): number => {
    counterId = 0;

    return counterId;
  };

  return { getCurrent, increment, reset };
};
