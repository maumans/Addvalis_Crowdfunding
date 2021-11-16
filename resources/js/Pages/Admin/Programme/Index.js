import React from 'react';
import Panel from "@/Layouts/Admin/Panel";

function Index({auth,success}) {
    return (
        <Panel
            auth={auth}
            success={success}
            active={"programme"}
            sousActive={"listeProgrammes"}
        >
            Liste des programmes

        </Panel>

    );
}

export default Index;
