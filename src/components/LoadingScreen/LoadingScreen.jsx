import styles from './css/loading-screen.scss';

export default function LoadingScreen() {
    return (
        <div className={styles.loadingScreen}>
            <img src="/logo.svg" className={styles.loading} alt="logo" />
        </div>
    );
}
