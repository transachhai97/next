import React from 'react';

import styles from './css/loading-screen.scss';

function LoadingScreen() {
    return (
        <div className={styles.loadingScreen}>
            <img src="/logo.svg" className={styles.loading} alt="logo" />
        </div>
    );
}

export default LoadingScreen;
