export default function OfferComponent(props: { name: string, body: string, price: number, discount: number }) {
    const getPriceHtml = () => {
        if (props.discount && props.discount > 0){
            const discountDecimal = props.discount / 100
            const newPrice = Math.round((props.price - props.price * discountDecimal) * 100)/100
            return <p><div className="text-danger">Promocja -{props.discount}%!</div><s>{props.price}zł</s> {" -> " + newPrice}zł </p>
        }
        return <p>{props.price}zł</p>
    }

    return (
        <div className="container border rounded m-3 p-2">
            <div className="border-bottom">
                <h5>{props.name}</h5>
            </div>
            <div className="border-bottom">
                <p dangerouslySetInnerHTML={{ __html: props.body }} />
            </div>
            <div className="px-3 pt-3 h4">
                {getPriceHtml()}
            </div>
        </div>
    )
}
