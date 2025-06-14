import { useCallback } from "react";

const useGoBack = () => {
  const goBack = useCallback((): void => {
    window.history.back();
  }, []);

  return { goBack };
};

export default useGoBack;
