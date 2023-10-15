

import styles from './BetterProgress.module.css'

const BetterProgress = ({ stage }: { stage: 'language' | 'difficulty' | 'situation'}) => {
    return (
        <div className={styles.progressCont}>
          <div className={styles.progress}>
            <div className={styles.progressNos}>
              <div className={styles.pnum} style={{
                backgroundColor: '#c2f9c9'
              }}>1</div>
              <div className={styles.pnum} style={{
                backgroundColor: stage === 'difficulty' || stage === 'situation' ? '#c2f9c9' : '#f9f6f4'
              }}>2</div>
              <div className={styles.pnum} style={{
                backgroundColor: stage === 'situation' ? '#c2f9c9' : '#f9f6f4'
              }}>3</div>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFg} style={{
                maxWidth: stage === 'language' ? '0%' : stage === 'difficulty' ? '50%' : '100%'
              }}>
              </div>
            </div>
        </div>
      </div>
    )
}

export default BetterProgress