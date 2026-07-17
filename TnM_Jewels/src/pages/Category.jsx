import { useParams } from "react-router-dom";

export default function Category() {

    const { category } = useParams();

    return (

        <div className="pt-40 text-center">

            <h1 className="text-5xl font-bold capitalize">

                {category}

            </h1>

        </div>

    );

}