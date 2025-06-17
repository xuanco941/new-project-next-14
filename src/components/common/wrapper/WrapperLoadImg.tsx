import Loading from '@/components/common/loading/Loading';
import React, { ReactNode, useEffect, useState } from 'react';

const preloadImages = (imageUrls: string[]): Promise<void> => {
    return new Promise((resolve) => {
        let loadedCount = 0;

        imageUrls.forEach((url) => {
            const img = new Image();
            img.src = url;
            img.onload = img.onerror = () => {
                loadedCount++;
                if (loadedCount === imageUrls.length) {
                    resolve();
                }
            };
        });
    });
};

const WrapperLoadImg = ({ children, imageUrls }: { children: ReactNode, imageUrls: string[] }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (imageUrls.length > 0) {
            preloadImages(imageUrls).then(() => {
                setIsLoaded(true);
            });
        }
        else{
            setIsLoaded(true);
        }

    }, []);

    if (!isLoaded) {
        return (<Loading sx={{height: "100%", width: "100%"}} />)
    }

    return <>
        {children}
    </>;
};

export default WrapperLoadImg;
