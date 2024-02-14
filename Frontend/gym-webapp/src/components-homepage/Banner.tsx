import { useState, useEffect } from "react"
import { getAllObjectsNoToken } from "../utils/ApiRequests"
import { Banner } from "../components/banner/List"

const FADE_INTERVAL_MS = 2000
const STATIC_INTERVAL_MS = 6000

type FadeProp = { fade: 'fade-in' | 'static' | 'fade-out' }

export default function BannerComponent() {
  const [fadeProp, setFadeProp] = useState<FadeProp>({ fade: 'fade-in' })
  const [wordOrder, setWordOrder] = useState(0)
  const [banners, setBanners] = useState<Array<Banner>>([{
    id:0,
    title:"No banners to show",
    body:"No banners to show",
    active: true
  }])

  useEffect(() => {
    const fadeTimeout = setInterval(() => {
      switch (fadeProp.fade){
        case 'fade-in':
          setFadeProp({fade: "static"})
          break;
        case 'static':
          setFadeProp({fade: "fade-out"})
          break;
        case 'fade-out':
          setFadeProp({fade: "fade-in"})
          setWordOrder((prevWordOrder) => (prevWordOrder + 1) % banners.length)
          break;
      }
    }, fadeProp.fade === 'static' ? STATIC_INTERVAL_MS : FADE_INTERVAL_MS)

    return () => clearInterval(fadeTimeout)
  }, [fadeProp,banners]);

  useEffect(() => {
    getAllObjectsNoToken("banners/active", setBanners);
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