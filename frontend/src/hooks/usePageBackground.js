import { useEffect } from 'react';

const usePageBackground = () => {
    useEffect(() => {
        const gradient = 'linear-gradient(135deg, rgb(232,234,246) 0%, rgb(197,202,233) 100%)';
        document.documentElement.style.background = gradient;
        document.documentElement.style.minHeight = '100vh';
        document.body.style.background = gradient;
        document.body.style.minHeight = '100vh';
        document.body.style.margin = '0';
        
        return () => {
            document.documentElement.style.background = '';
            document.documentElement.style.minHeight = '';
            document.body.style.background = '';
            document.body.style.minHeight = '';
        };
    }, []);
};

export default usePageBackground;
