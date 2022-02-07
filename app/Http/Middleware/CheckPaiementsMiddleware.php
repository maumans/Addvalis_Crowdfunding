<?php

namespace App\Http\Middleware;

use App\Models\Paiement;
use App\Services\OrangeMoney;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckPaiementsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $om = new OrangeMoney(config('om', []));
        Paiement::where('status', 'INITIATED')->where('checked', false)->get()
            ->each(function($paiement) use($om) {
                $transaction = $om->checkPaiement($paiement->order_id, $paiement->amount, $paiement->pay_token);
                $data = json_decode($transaction);
                if (!empty($data->status)) {
                    $paiement->status = $data->status;
                    $paiement->save();

                    if ($data->status == 'SUCCESS') {
                        $paiement->projet->contributeurs()->syncWithoutDetaching([Auth::id()=>["montant"=>$paiement->amount]]);
                    }

                } else {
                    throw new \Exception('Impossible de verifier la transaction');
                }
                $paiement->checked = true;
                $paiement->save();
            });
        return $next($request);
    }
}
