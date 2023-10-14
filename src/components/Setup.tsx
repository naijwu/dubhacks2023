import { useState } from "react";

export default function Setup({
    data,
    setData,
    onNext
}: {
    data: any;
    setData: any;
    onNext: () => void;
}) {

    const [stage, setStage] = useState<'language' | 'difficulty' | 'situation'>('language');

    return (
        <div>
            setup
        </div>
    )
}