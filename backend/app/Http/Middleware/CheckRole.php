<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 401);
        }

        $userRole = $user->role;

        foreach ($roles as $role) {
            if ($userRole === $role) {
                return $next($request);
            }
        }

        return response()->json([
            'success' => false,
            'message' => 'Forbidden. You do not have permission to access this resource.',
        ], 403);
    }
}
