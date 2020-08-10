<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class PublicController extends Controller
{
    /**
    * Login
    */
    public function login(Request $request) {

        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'message' => 'These credentials do not match our records.'
            ], 404);
        }

        $token = $user->createToken('laravel')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function recover(Request $request) {
        $data = $request->validate([
            'email' => 'required|email'
        ]);

        $response = Password::sendResetLink(
            $request->only('email'),
            function (Message $message) {
                $message->subject($this->getEmailSubject());
            }
        );

        return response([
            'message' => trans($response)
        ], 201);

        switch ($response) {
            case Password::RESET_LINK_SENT:
                // return \Response::json(array("status" => 200, "message" => trans($response), "data" => array()));
                return response($response, 201);
            case Password::INVALID_USER:
                // return \Response::json(array("status" => 400, "message" => trans($response), "data" => array()));
                return response($response, 400);
        }
    }
}
