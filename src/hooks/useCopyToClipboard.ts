// hooks/useCopyToClipboard.ts
import { useState, useCallback } from 'react';
import useToastCustom from './useToastCustom';

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);
  const toast = useToastCustom()
  const copyToClipboard = useCallback((text: string) => {
    if (!navigator.clipboard) {
      console.error('Trình duyệt của bạn không hỗ trợ Clipboard');
      return;
    }

    navigator.clipboard.writeText(text).then(
      () => {
        setIsCopied(true);
        toast.info('Copied')
        setTimeout(() => setIsCopied(false), 2000);
      },
      (err) => {
        console.error('Lỗi khi sao chép văn bản: ', err);
        setIsCopied(false);
      },
    );
    // eslint-disable-next-line
  }, []);

  return { isCopied, copyToClipboard };
};

export default useCopyToClipboard;
