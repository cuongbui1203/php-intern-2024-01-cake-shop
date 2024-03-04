<?php

namespace App\Http\Middleware;

use App;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;

class Localization
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $lang = 'en';
        $lang = Cookie::get('lang') ?? $lang;
        $lang = $request->header('X-localization') ?? $lang;
        if (in_array($lang, config('languages.langs'))) {
            App::setLocale($lang);
            $request->headers->add([
                'X-localization' => $lang,
            ]);
        } else {
            App::setLocale('en');
            $request->headers->add([
                'X-localization' => 'en',
            ]);
        }

        return $next($request);
    }
}
