<?php

namespace app\middleware;

class CorsMiddleware
{
    public function handle($request, \Closure $next)
    {
        $response = $next($request);
        // 设置允许跨域的响应头
        $response->header([
            'Access-Control-Allow-Origin'  => '*',
            'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers' => 'Authorization, Content-Type, Web-Url',
            'Access-Control-Allow-Credentials' => 'true',
        ]);

        return $response;
    }
}

