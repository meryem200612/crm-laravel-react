/** 
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\InterventionController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth publique
Route::post('/login', [AuthController::class, 'login']);

// Routes protégées par Sanctum
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Clients
    Route::apiResource('clients', ClientController::class);

    // Interventions
    Route::apiResource('interventions', InterventionController::class);

    // Techniciens (admin seulement)
    Route::middleware('role:admin')->group(function () {
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);
    });
});

*/

<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\InterventionController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

// Auth publique
Route::post('/login', [AuthController::class, 'login']);

// ===== TEST MODE (SANS AUTH) =====
Route::apiResource('clients', ClientController::class);
Route::apiResource('interventions', InterventionController::class);
Route::get('/dashboard', [DashboardController::class, 'index']);

// (OPTIONNEL) garder admin plus tard
Route::middleware('role:admin')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
});