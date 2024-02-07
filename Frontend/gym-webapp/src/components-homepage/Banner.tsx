import { useState, useEffect } from "react"
import { getAllObjectsNoToken } from "../utils/ApiRequests"
import { Banner } from "../components/banner/List"

const FADE_INTERVAL_MS = 2000
const STATIC_INTERVAL_MS = 6000
const WORD_CHANGE_INTERVAL_MS = FADE_INTERVAL_MS * 2 + STATIC_INTERVAL_MS

type FadeProp = { fade: 'fade-in' | 'static' | 'fade-out' }

export default function BannerComponent() {
  const [fadeProp, setFadeProp] = useState<FadeProp>({ fade: 'fade-in' })
  const [wordOrder, setWordOrder] = useState(0)
  const [banners, setBanners] = useState<Array<Banner>>([{
    id:0,
    title:"Brak bannerów do załadowania",
    body:"Brak bannerów do załadowania",
    active: true
  }])


  const getBanners = () => {
    getAllObjectsNoToken("banners/active", setBanners)
  }

  // useEffect(() => {
  //   const fadeTimeout = setInterval(() => {
  //     switch (fadeProp.fade){
  //       case 'fade-in':
  //         setFadeProp({fade: "static"})
  //         break;
  //       case 'static':
  //         setFadeProp({fade: "fade-out"})
  //         break;
  //       case 'fade-out':
  //         setFadeProp({fade: "fade-in"})
  //         break;
  //     }
  //   }, fadeProp.fade === 'static' ? STATIC_INTERVAL_MS : FADE_INTERVAL_MS)

  //   return () => clearInterval(fadeTimeout)
  // }, [fadeProp,banners]);

  useEffect(() => {
    const wordTimeout = setInterval(() => {
      setWordOrder((prevWordOrder) => (prevWordOrder + 1) % banners.length)
    }, STATIC_INTERVAL_MS)

    return () => clearInterval(wordTimeout)
  }, [banners])

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <div className="banner-container container-fluid">
      <div className={`h1 w-70 ${fadeProp.fade}`}>
        {banners[wordOrder].title}
      </div>
      <div className={`h3 w-70 ${fadeProp.fade}`}>
        {banners[wordOrder].body}
      </div>
    </div>
  )
}