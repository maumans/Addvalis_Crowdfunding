import React from 'react';
import Panel from "@/Layouts/Admin/Panel";

function Show({auth,success}) {
    return (
        <Panel
            auth={auth}
            success={success}
            active={"programme"}
            sousActive={"voirProgramme"}
        >
            Voir le programme

        </Panel>
    );
}

export default Show;
