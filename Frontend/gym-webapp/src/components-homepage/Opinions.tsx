import { useState, useEffect } from "react"
import { getAllObjectsNoToken } from "../utils/ApiRequests"
import { Opinion } from "../components/opinion/List"

const FADE_INTERVAL_MS = 2000
const STATIC_INTERVAL_MS = 6000
const WORD_CHANGE_INTERVAL_MS = FADE_INTERVAL_MS * 2 + STATIC_INTERVAL_MS

type FadeProp = { fade: 'fade-in' | 'static' | 'fade-out' }

export default function Opinions() {
    const [fadeProp, setFadeProp] = useState<FadeProp>({ fade: 'fade-in' })
    const [wordOrder, setWordOrder] = useState(0)
    const [opinions, setOpinions] = useState<Array<Opinion>>([{
        id: 0,
        author: "Brak opinii do załadowania",
        body: "Brak opinii do załadowania",
        active: true
    }])


    const getOpinions = () => {
        getAllObjectsNoToken("opinions/active", setOpinions)
    }

    // useEffect(() => {
    //     if (opinions[0].id != 0){
    //         const fadeTimeout = setInterval(() => {
    //             switch (fadeProp.fade) {
    //                 case 'fade-in':
    //                     setFadeProp({ fade: "static" })
    //                     break;
    //                 case 'static':
    //                     setFadeProp({ fade: "fade-out" })
    //                     break;
    //                 case 'fade-out':
    //                     setFadeProp({ fade: "fade-in" })
    //                     break;
    //             }
    //         }, fadeProp.fade === 'static' ? STATIC_INTERVAL_MS : FADE_INTERVAL_MS)

    //         return () => clearInterval(fadeTimeout)
    //     }
    // }, [fadeProp, opinions])

    useEffect(() => {
        const wordTimeout = setInterval(() => {
            setWordOrder((prevWordOrder) => (prevWordOrder + 1) % opinions.length)
        }, WORD_CHANGE_INTERVAL_MS)

        return () => clearInterval(wordTimeout)
    }, [opinions])

    useEffect(() => {
        getOpinions();
    }, []);

    useEffect(() => {
        if (opinions.length === 0) {
            setOpinions([{
                id: 0,
                author: "Brak opinii do załadowania",
                body: "Brak opinii do załadowania",
                active: true
            }])
        }
    })

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