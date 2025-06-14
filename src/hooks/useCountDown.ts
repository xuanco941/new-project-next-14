import { useEffect, useState } from "react";

const useCountDown = (num: number, isRun: boolean) => {
  const [value, setValue] = useState(num);

  useEffect(() => {
    if (isRun) {
      setValue(num);
    }
    else{
      setValue(0);
    }
  }, [num, isRun]);

  useEffect(() => {
    let countdown = null;
    if (isRun) {
      countdown = setInterval(() => {
        setValue((prev) => {
          if (prev > 0) {
            return prev - 1;
          }
          return 0;
        });
      }, 1000);
    }

    return () => {
      if (countdown) {
        clearInterval(countdown);
      }
    }
  }, [isRun]);

  return value;
};

export default useCountDown;
