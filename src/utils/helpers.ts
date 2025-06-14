export const isValidPage = (pathname: string, targetPath: string): boolean => {
  const languageRegex = /^\/[a-z]{2}(\/.*)?$/;

  const pathWithoutLanguage = pathname.replace(languageRegex, "$1") || "/";

  return (
    pathWithoutLanguage.trim() === targetPath ||
    pathWithoutLanguage.trim() === `/${targetPath}`
  );
};


export function hasChildren(item: any) {
  const { items: children } = item;

  if (children === undefined) {
    return false;
  }

  if (children.constructor !== Array) {
    return false;
  }

  if (children.length === 0) {
    return false;
  }

  return true;
}

export function handleAvatar(input: number): number {
  if (input > 20) {
    return Math.floor(Math.random() * 20) + 1;
  } else {
    return input;
  }
}

export const dataSkeleton = () => {
  const arr = [];
  for (let i = 1; i < 20; i++) {
    arr.push(i);
  }
  return arr;
};

export const removeVietnameseTones = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};
export const removeVietnamese = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/\s+/g, "-")
    .toLowerCase();
};


export function roundNumber(value: number | string, number: number) {
  return parseFloat(Number(value).toFixed(number ? number : 5));
}

export function formatDateUS(inputDate: string | Date) {
  if (!inputDate) {
    return "";
  }
  // Tạo một đối tượng Date từ chuỗi đầu vào
  try {
    if (typeof inputDate == "string") {
      inputDate = new Date(inputDate);
    }
    // Lấy các thông tin thời gian từ đối tượng Date
    const hours = inputDate.getHours().toString().padStart(2, '0');
    const minutes = inputDate.getMinutes().toString().padStart(2, '0');
    const seconds = inputDate.getSeconds().toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); //Tháng trong JavaScript bắt đầu từ 0, nên cần cộng thêm 1
    const year = inputDate.getFullYear();


    if (!day || !month || !year) {
      return '';
    }

    const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  } catch {
    return inputDate.toString();
  }


}
export function formatSecondsTime(seconds: number) {
  const hours = Math.floor(seconds / 3600); // Lấy số giờ
  const minutes = Math.floor((seconds % 3600) / 60); // Lấy số phút
  const secs = seconds % 60; // Lấy số giây

  // Định dạng để đảm bảo luôn có 2 chữ số
  const formattedTime = [
    String(hours).padStart(2, '0'),
    String(minutes).padStart(2, '0'),
    String(secs).padStart(2, '0')
  ].join(' : ');
  return formattedTime;

}

export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const normaliseProgress = (value: number, MIN: number, MAX: number) => ((value - MIN) * 100) / (MAX - MIN);

export function formatNumber(value: number | string, maxDecimalDigits?: number, minDecimalDigits?: number, floor?: boolean) {
  if (value == 0) {
    return 0;
  }
  if (!value) {
    return "";
  }
  if (!maxDecimalDigits) {
    // maxDecimalDigits = !isNaN(Number(localStorage.getItem(LOCALSTORAGE.MAX_DECIMAL_DIGITS))) ?
    //   Number(localStorage.getItem(LOCALSTORAGE.MAX_DECIMAL_DIGITS)) : 8;
    maxDecimalDigits = maxDecimalDigits ?? 8;
  }

  const num = Number(value);

  if (floor) {
    const factor = 10 ** maxDecimalDigits;
    const truncated = Math.floor(num * factor) / factor; // bỏ phần thập phân
    return truncated.toLocaleString('en-US', {
      minimumFractionDigits: minDecimalDigits,
      maximumFractionDigits: maxDecimalDigits ?? 0
    });
  }

  return num.toLocaleString('en-US', {
    minimumFractionDigits: minDecimalDigits,
    maximumFractionDigits: maxDecimalDigits ?? 0
  });
}


export function formatShortNumber(
  value: number,
  maxDecimalDigits?: number,
  minDecimalDigits?: number
): string {

  if (!maxDecimalDigits) {
    // maxDecimalDigits = !isNaN(Number(localStorage.getItem(LOCALSTORAGE.MAX_DECIMAL_DIGITS))) ?
    //   Number(localStorage.getItem(LOCALSTORAGE.MAX_DECIMAL_DIGITS)) : 8;
    maxDecimalDigits = maxDecimalDigits ?? 8;

  }

  const absValue = Math.abs(value);
  let newValue = value;
  let suffix = "";

  if (absValue >= 1e9) {
    newValue = value / 1e9;
    suffix = "B";
  } else if (absValue >= 1e6) {
    newValue = value / 1e6;
    suffix = "M";
  } else if (absValue >= 1e3) {
    newValue = value / 1e3;
    suffix = "K";
  }
  if (!newValue) {
    return "0";
  }

  return newValue.toLocaleString("en-US", {
    maximumFractionDigits: maxDecimalDigits,
    minimumFractionDigits: minDecimalDigits,
  }) + suffix;
}

export const loadScriptToBody = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `${src}?t=${Date.now()}`;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
};