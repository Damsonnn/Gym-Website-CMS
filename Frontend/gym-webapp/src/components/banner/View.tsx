import { CrudAction } from "../../utils/CrudAction";

export default function BannerView(props: {action: CrudAction}) {
  return (
    <div>
        <form action="">
            <label htmlFor="title">Tytuł:</label>
            <input type="text" name='title' />
        </form>
    </div>
  )
}
