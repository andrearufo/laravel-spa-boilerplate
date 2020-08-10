<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', 'PublicController@login');
Route::post('/recover', 'PublicController@recover');

Route::middleware('auth:sanctum')->prefix('user')->group(function () {
    Route::get('index', 'UserController@index');
    Route::get('show/{user}', 'UserController@show');
    Route::post('store', 'UserController@store');
    Route::post('update/{user}', 'UserController@update');
    Route::post('destroy/{user}', 'UserController@destroy');
});

Route::middleware('auth:sanctum')->prefix('note')->group(function () {
    Route::get('index', 'NoteController@index');
    Route::get('show/{note}', 'NoteController@show');
    Route::post('store', 'NoteController@store');
    Route::post('update/{note}', 'NoteController@update');
    Route::post('destroy/{note}', 'NoteController@destroy');
});
