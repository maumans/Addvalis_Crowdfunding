import React from 'react';
import Authenticated from "@/Layouts/Authenticated";

function Show({auth,errors,projet}) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
        >
            <div className={"relative"}>
                <img src={projet.image} className={"w-full"} style={{maxHeight:500,objectFit:"cover"}}/>

                <div  className={"absolute z-1 w-full top-10 md:left-60 md:block flex justify-center" }>
                    <div data-aos={"flip-left"} className={"md:text-6xl sm:text-4xl text-2xl text-white bg-indigo-600 p-2"} style={{width:"fit-content"}}>
                        {projet.titre}
                    </div>
                </div>
            </div>

        </Authenticated>
    );
}

export default Show;
