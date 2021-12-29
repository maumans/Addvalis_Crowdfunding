<?php

namespace App\Http\Middleware;

use App\Models\Programme;
use Closure;
use Illuminate\Http\Request;

class ProgrammeIsEditable
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
        if(Programme::find($request->programme)->projets->count())
        {
          return redirect()->back();
        }
        return $next($request);
    }
}
