import React, {useEffect} from 'react';
import Panel from "@/Layouts/Admin/Panel";
import Authenticated from "@/Layouts/Authenticated";

import {Link} from "@inertiajs/inertia-react";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import {capitalize} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Swal from "sweetalert2";

function Index(props) {
    useEffect(()=>{
        props.success && Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: props.success,
            showConfirmButton: false,
            timer: 2000
        })
    },[props.success])


    return (
       <Panel
           auth={props.auth}
           errors={props.errors}
           projets={props.projets}
           active={"projet"}
           sousActive={"validation"}
       >
           <Validation
            auth={props.auth}
            projets={props.projets} />
       </Panel>
    );
}

function Validation({projets,auth})
{

    return <div className="flex xs:items-center justify-center w-full">
                <div className={"grid md:grid-cols-3 xs:grid-cols-1 gap-4 mb-20 w-full xs:w-auto"}>
            {
                projets.map((p,i)=>(
                    <div key={p.id} data-aos-once={true} data-aos={"zoom-in"} data-aos-duration={500} className={"flex flex-col"} style={{maxWidth:400,minWidth:"auto",height:400,boxShadow:"2px 5px 5px gray"}}>
                        <div className={"flex space-x-2 bg-black p-2"}>
                            <Avatar sx={{ bgcolor: red[600] }} className={"border-2 bg-indigo-600"}>
                                M
                            </Avatar>
                            <div>
                                <div className={"font text-white"}>{p.titre}</div>
                                <span className={"text-white"}>{p.created_at.split("T")[0]}</span>
                            </div>
                        </div>
                        <div className={"overflow-hidden"}>
                            <img className={"transform hover:scale-110 transition duration-300 ease-in"} src={p.image} alt="" style={{height:200,width:"100%",objectFit:"cover"}}/>
                        </div>
                        <div className={"p-2"}>
                            {capitalize(p.description.toLowerCase())}
                        </div>
                        <div className={"mt-auto w-11/12 border-b border-t mx-5 self-center"}>
                            <div className={"flex space-x-2 ml-5 py-2 "}>
                                <FavoriteIcon/>
                                <div>
                                    {p.likeurs.length}
                                </div>
                            </div>
                        </div>
                        <div className={"mt-auto ml-2 mb-2"}>
                            <Link href={route("admin.projet.validation.show",[auth.user.id,p?.id])} className={"text-white bg-indigo-600 hover:bg-indigo-800 transition duration-500 rounded p-2"}>
                                Voir en details
                            </Link>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>

}

export default Index;
