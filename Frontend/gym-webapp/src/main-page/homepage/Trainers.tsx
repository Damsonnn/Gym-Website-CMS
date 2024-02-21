import { Trainer } from "../../admin-panel/components/trainer/List"
import { getAllObjectsNoToken } from "../../utils/ApiRequests"
import { useState, useEffect } from "react"
import TrainerComponent from "../list-item-components/Trainer"

export default function Trainers() {
    const [trainers, setTrainers] = useState<Array<Trainer>>([]);

    const showTrainers = (trainers: Array<Trainer>) => {
        if (trainers.length > 0) {
            return trainers.map(trainer => {
                return <TrainerComponent key={trainer.id} id={trainer.id} name={trainer.firstName + " " + trainer.lastName}/>
            })
        }
        return <h2 className="mt-3 text-center">No trainers to show</h2>
    }

    useEffect(() => {
        getAllObjectsNoToken("trainers/active", setTrainers);
    }, []);

    return (
        <div className="trainers-container">
            {showTrainers(trainers)}
        </div>
    )
}
