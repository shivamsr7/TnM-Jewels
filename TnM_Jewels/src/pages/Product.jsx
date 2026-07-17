import { useParams } from "react-router-dom";

export default function Product() {

    const { slug } = useParams();

    return (

        <div className="pt-40 text-center">

            <h1 className="text-5xl font-bold">

                {slug}

            </h1>

        </div>

    );

}