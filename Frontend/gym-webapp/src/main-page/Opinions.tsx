import { useState, useEffect } from "react"
import { getAllObjectsNoToken } from "../utils/ApiRequests"
import { Opinion } from "../admin-panel/components/opinion/List"

const FADE_INTERVAL_MS = 2000
const STATIC_INTERVAL_MS = 6000

type FadeProp = { fade: 'fade-in' | 'static' | 'fade-out' }

export default function Opinions() {
    const [fadeProp, setFadeProp] = useState<FadeProp>({ fade: 'fade-in' })
    const [wordOrder, setWordOrder] = useState(0)
    const [opinions, setOpinions] = useState<Array<Opinion>>([{
            id: 0,
            author: "No opinions to show",
            body: "No opinions to show",
            active: true
        }
    ])

    useEffect(() => {
        const fadeTimeout = setInterval(() => {
            switch (fadeProp.fade) {
                case 'fade-in':
                    setFadeProp({ fade: "static" })
                    break;
                case 'static':
                    setFadeProp({ fade: "fade-out" })
                    break;
                case 'fade-out':
                    setFadeProp({ fade: "fade-in" })
                    setWordOrder((prevWordOrder) => (prevWordOrder + 1) % opinions.length);
                    break;
            }
        }, fadeProp.fade === 'static' ? STATIC_INTERVAL_MS : FADE_INTERVAL_MS)

        return () => clearInterval(fadeTimeout)
    }, [fadeProp])

    useEffect(() => {
        getAllObjectsNoToken("opinions/active", setOpinions);
    }, []);

    return (
        <div className="opinion-container container-fluid rounded border mb-3">
            <div className="body-container border-bottom w-100">
                <div className={`h4 m-4  ${fadeProp.fade}`}>
                    "{opinions[wordOrder].body}"
                </div>
            </div>
            <div className="author-container">
                <div className={`h5 m-1 ${fadeProp.fade}`}>
                    ~{opinions[wordOrder].author}
                </div>
            </div>
        </div>
    )
}