import React from 'react';
import Authenticated from "@/Layouts/Authenticated";

function Index({auth,success,programmeRecherche,secteursRecherche,projetsRecherche}) {
    return (
       <Authenticated
        auth={auth}
       >
           <div>
               Toutes les recherches
           </div>
       </Authenticated>

    );
}

export default Index;
