import React, {useEffect} from 'react';
import Panel from "@/Layouts/Admin/Panel";
import Swal from "sweetalert2";
import {Inertia} from "@inertiajs/inertia";
import Authenticated from "@/Layouts/Authenticated";
import {maxHeight} from "@mui/system";
import ShowMoreText from "react-show-more-text";
import {capitalize} from "@mui/material";
import {Link} from "@inertiajs/inertia-react";

function Index({auth,success,programmes,errors}) {
    useEffect(()=>{
        success && Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: success,
            showConfirmButton: false,
            timer: 2000
        })
    },[success])

    function handleClick(e,id) {
        Inertia.get(route("programme.show",id))
    }

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            active={"programmes"}
        >
            <div className={"flex justify-center font"}>
                <div className={"grid cols-1 space-y-10 md:w-8/12 w-full px-5"}>

                    <div data-aos={"zoom-in"} className={"my-8 md:text-2xl text-xl projetfont border-indigo-600 border-b-2 border-l-2 font"} style={{width:"fit-content"}}>
                        <div className={"m-2 p-1 bg-indigo-600 text-white"}>
                            Nos programmes
                        </div>

                    </div>

                    <div  className={"space-y-10"}>

                        {programmes.map((p)=>(
                            <div key={p.id} className={"grid md:grid-cols-2 grid-col-1 gap-4"}>
                                <div>
                                    <img src={p.image} style={{height:400}} className={"object-cover rounded w-full"} />
                                </div>
                                <div className="flex flex-col justify-between">
                                    <div className={"px-2 space-y-2"}>
                                        <div className={"uppercase font-bold text-xl"}>
                                            {p.titre}
                                        </div>
                                        <div>
                                            <ShowMoreText
                                                more=""
                                                lines={7}
                                                className={"w-full"}
                                            >
                                                {capitalize(p.description.toLowerCase())}
                                            </ShowMoreText>
                                        </div>
                                        <div className={"p-2 text-xs font-bold rounded bg-indigo-600 text-white"} style={{width:"fit-content"}}>
                                            Du {p.dateDebut} au {p.dateFin}
                                        </div>
                                        <div className={"text-xs font-bold"}>
                                            Lancé par: Addvalis
                                        </div>
                                    </div>
                                    <div className={"mt-auto p-2"}>
                                        <Link className={"underline hover:text-indigo-400 "} href={route("programme.show",p.id)}>
                                            En savoir plus
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </div>

        </Authenticated>

    );
}

export default Index;
