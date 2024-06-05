<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/Register-user', [UserController::class, 'saveUser']);
Route::get('/get-user', [UserController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/users/posts-and-comments', [UserController::class, 'getUserWithPostsAndComments']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

