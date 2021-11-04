import React, {useEffect} from 'react';
import Authenticated from "@/Layouts/Authenticated";
import Swal from "sweetalert2";

function Attente({auth,errors,success}) {
    useEffect(()=>{
        success && Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: success,
            showConfirmButton: false,
            timer: 2000
        })
    },[success])
    return (
        <Authenticated
            auth={auth} errors={errors}
            active={"projets"}
            >
            <div className={"flex justify-center"}>
                <div className={"mt-10 text-indigo-600 text-xl max-w-4xl"}>
                    <p>
                        Votre projet a été crée et est en cours de validation
                    </p>
                    <p>
                        Nous vous contacterons ultérieurement si le projet est validé
                    </p>
                </div>
            </div>
        </Authenticated>
    );
}

export default Attente;
