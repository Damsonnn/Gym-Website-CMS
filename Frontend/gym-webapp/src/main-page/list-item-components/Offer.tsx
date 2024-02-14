import { convertFromRaw } from "draft-js"
import { stateToHTML } from "draft-js-export-html";

export default function OfferComponent(props: { name: string, body: string, price: number, discount: number }) {
    const getPriceHtml = () => {
        if (props.discount && props.discount > 0){
            const discountDecimal = props.discount / 100
            const newPrice = Math.round((props.price - props.price * discountDecimal) * 100)/100
            return <p><span className="text-danger">Sale -{props.discount}%!</span><br/><s>{props.price}$</s> {" -> " + newPrice}$ </p>
        }
        return <p>{props.price}$</p>
    }

    const editorToHtml = () => {
        if (props.body) {
            const rawBody = convertFromRaw(JSON.parse(props.body))
            return stateToHTML(rawBody)
        }
        return "No content"
    }

    return (
        <div className="container border rounded m-3 p-2">
            <div className="border-bottom p-1">
                <h5>{props.name}</h5>
            </div>
            <div className="border-bottom p-2">
                <p dangerouslySetInnerHTML={{ __html: editorToHtml() }} />
            </div>
            <div className="px-3 pt-3 h4">
                {getPriceHtml()}
            </div>
        </div>
    )
}
