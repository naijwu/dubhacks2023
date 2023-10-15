import { useState } from "react";
import styles from './Setup.module.css'

export default function Setup({
    data,
    setData,
    onNext
}: {
    data: any;
    setData: any;
    onNext: () => void;
}) {

    const availableLanguages = [ 'English', 'Mandarin', 'Korean', 'French' ]
    const languageData: any = {
        'English': {
            plaintext: 'english',
            code: 'en',
        },
        'Mandarin': {
            plaintext: 'mandarin chinese',
            code: 'cn',
        },
        'Korean': {
            plaintext: 'korean',
            code: 'kr',
        },
        'French': {
            plaintext: 'french',
            code: 'fr',
        }
    }
    const difficulties = ['beginner', 'intermediate', 'advanced']

    const [stage, setStage] = useState<'language' | 'difficulty' | 'situation'>('language');

    const [isCustom, setIsCustom] = useState<boolean>(false);

    function updateDataField(key: string, value: any) {
        const updatedData = JSON.parse(JSON.stringify(data))
        updatedData[key] = value
        setData(updatedData)
    }
    
    const handleLanguage = (e: any) => {
        updateDataField('language', languageData[e.target.value])
    }

    const handleDifficulty = (e: any) => {
        updateDataField('difficulty', difficulties[e.target.value])
    }
    
    const handleSituation = (e: any) => {
        if (e.target.value === 'Other') {
            setIsCustom(true)
            updateDataField('situation', "")
        } else {
            setIsCustom(false)
            updateDataField('situation', e.target.value)
        }
    }
    const handleCustomSituation = (e: any) => {
        updateDataField('situation', e.target.value)
    }

    const handlePrev = () => {
        if (stage === 'difficulty') {
            setStage('language');
        } else if (stage === 'situation') {
            setStage('difficulty');
        }
    }

    const handleNext = () => {
        if (stage === 'language') {
            setStage('difficulty');
        } else if (stage === 'difficulty') {
            setStage('situation');
        } else {
            console.log(data)
            onNext();
        }
    }

    return (
        <div>
            <div>
                current stage: {stage} {stage === 'language' ? '1' : stage === 'difficulty' ? '2' : '3'}
            </div>
            {stage === 'language' && (
                <div>
                    select language:
                    <select onChange={handleLanguage} defaultValue="English">
                        {availableLanguages.map((language) => <option key={language}>{language}</option>)}
                    </select>
                </div>
            )}
            {stage === 'difficulty' && (
                <div>
                    select difficulty:
                    <input type="range" min="0" max="2" value={difficulties.indexOf(data.difficulty)} onChange={handleDifficulty} step="1"/>
                </div>
            )}
            {stage === 'situation' && (
                <div>
                    select situation:
                    <select onChange={handleSituation} defaultValue="English">
                        <option>Ordering coffee from a barista</option>
                        <option>Other</option>
                    </select>
                    {isCustom && (
                        <div>
                            <input type="text" value={data.situation} onChange={handleCustomSituation} />
                        </div>
                    )}
                </div>
            )}

            <div className={styles.prevNext}>
                {stage !== 'language' && (
                    <div onClick={handlePrev}>
                        previous
                    </div>
                )}
                <div onClick={handleNext}>
                    next
                </div>
            </div>
        </div>
    )
}