import { useState, useEffect } from 'react';

export default function useOnlineStatus() {
    const [online, setOnline] = useState(true);

    function handler(event) {
        setOnline(navigator.onLine);

        if (event.type === 'online') {
            // handle stuffs when browser resume online
        } else {
            // handle stuffs when browser goes offline
        }
    }

    useEffect(() => {
        window.addEventListener('online', handler);
        window.addEventListener('offline', handler);

        return () => {
            window.removeEventListener('online', handler);
            window.removeEventListener('offline', handler);
        };
    });

    return { online };
}
