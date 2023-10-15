import Logo from "./Logo";
import styles from './Landing.module.css'
import Google from "./Google";


export default function Landing(){

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <div className={styles.logoContainer}>
                    <Logo />
                </div>
            </div>
            <div className={styles.siwg}>
                <Google />
                Continue with Google
            </div>
        </div>
    )
}