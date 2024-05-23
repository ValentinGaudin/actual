<?php

declare(strict_types=1);

use App\Http\Controllers\CandidateController;
use App\Http\Controllers\MissionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::withoutMiddleware('auth:sanctum')
    ->group(static function () {
        Route::apiResources(['candidates' => CandidateController::class]);
        Route::get('missions', MissionController::class);
    });
