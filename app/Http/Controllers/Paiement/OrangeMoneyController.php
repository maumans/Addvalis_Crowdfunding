<?php

namespace App\Http\Controllers\Paiement;

use App\Http\Controllers\Controller;
use App\Models\Paiement;
use App\Models\Projet;
use App\Models\TypePaiement;
use App\Services\OrangeMoney;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class OrangeMoneyController extends Controller
{
    public function init(Request $request){
        $request->validate([
            "montant" =>"required|integer|min:10000|max:100000000"
        ],
            [
                "montant.required" =>"Le montant est requis",
                "montant.integer" =>"Le montant doit etre un entier",
                "montant.max" =>"Le montant max est 100.000.000",
                "montant.min" =>"Le montant min est 1000",
            ]);

        $projet=Projet::find($request->projetId);


        $om = new OrangeMoney(config('om', []));

        $response = $om->initPaiement($request->montant);


        $data = json_decode($response);
        if ($data->message == 'OK') {

           $paiement = Paiement::create([
               'order_id' => $data->order_id,
               'amount' => $data->amount,
               'pay_token' => $data->pay_token,
           ]);

           $paiement->typePaiement()->associate(TypePaiement::where("libelle","Orange Money")->first())->save();

            $projet->paiements()->save($paiement);

        } else {
            throw new \Exception("Impossible d'initier un paiement");
        }

        return $data->payment_url;
    }

    public function return(Request $request){
        $paiement = Paiement::where(['order_id' => $request->t])->first();

        /*
        if ($paiement->paiementable_type == "App\Location") {
            $location = Location::findOrFail($paiement->paiementable_id);
        }

        if ($paiement->paiementable_type == "App\LocationChauffeur") {
            $location = LocationChauffeur::findOrFail($paiement->paiementable_id);
        }
        */


        if ($paiement != null) {
            $om = new OrangeMoney(config('om', []));
            $transaction = $om->checkPaiement($paiement->order_id, $paiement->amount, $paiement->pay_token);
            $data = json_decode($transaction);
            if (!empty($data->status)) {
                $paiement->status = $data->status;
                $paiement->save();

                if ($data->status == 'SUCCESS') {
                    $paiement->projet->contributeurs()->syncWithoutDetaching([Auth::id()=>["montant"=>$paiement->amount]]);

                    return redirect()->route('projet.show',$paiement->projet->id)->with('success', 'Vous avez contribué à ce projet avec succès');
                }
                if ($data->status == 'FAILED') {
                    return redirect()->route('projet.show',$paiement->projet->id)->with('erreur', 'Echec du paiement');
                }

            } else {
                throw new \Exception('Impossible de verifier la transaction');
            }
        } else {
            throw new \Exception('Paiement non trouvé');
        }


        return redirect()->route('projet.show',$paiement->projet->id)->with('erreur', 'Echec du paiement');
    }

    public function cancel(Request $request){

        $paiement = Paiement::where(['order_id' => $request->t])->first();

        if ($paiement) {
            if ($paiement->status != 'INITIATED') {
                throw new \Exception('Access non autorisé');
            }
            $paiement->status = 'CANCELED';
            $paiement->save();
        } else {
            throw new \Exception('Paiement non trouvé');
        }

        return redirect()->route('projet.show',$paiement->projet->id)->with('erreur', 'Paiement annulé');
    }

    public function notif(Request $request){

        $paiement = Paiement::where(['order_id' => $request->t])->first();

        if ($paiement != null) {
            $om = new OrangeMoney(config('om', []));

            $transaction = $om->checkPaiement($paiement->order_id, $paiement->amount, $paiement->pay_token);
            $data = json_decode($transaction);

            if (!empty($data->status)) {
                $paiement->status = $data->status;
                $paiement->save();
                //Autre processuss
            } else {
                throw new \Exception('Impossible de verifier la transaction');
            }
        } else {
            throw new \Exception('Paiement non trouvé');
        }
    }
}
