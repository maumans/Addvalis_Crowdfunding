import React from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, useForm } from '@inertiajs/inertia-react';
import Authenticated from "@/Layouts/Authenticated";

export default function ForgotPassword({ status,auth,AllProjets }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <Authenticated
            auth={auth}
            AllProjets={AllProjets}
        >
            <Guest>
                <Head title="Mot passe oublié" />

                <div className="mb-4 text-sm text-gray-500 leading-normal">
                    Avez vous oublié votre mot de passe? Pas de problème. Entrez votre adresse mail et nous vous enverrons par e-mail un lien de réinitialisation de mot de passe qui vous permettra d'en choisir un nouveau.
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <ValidationErrors errors={errors} />

                <form onSubmit={submit}>
                    <Input
                        type="text"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ml-4" processing={processing}>
                            Reinitialser le mot de passe par email
                        </Button>
                    </div>
                </form>
            </Guest>
        </Authenticated>
    );
}
