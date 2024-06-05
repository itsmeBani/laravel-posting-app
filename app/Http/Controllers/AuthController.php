<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {


            $credentials = $request->only('email', 'password');
            if (Auth::attempt($credentials)) {

                $user = Auth::user();


                $token = $user->createToken('main')->plainTextToken;

                return response()->json(['user' => $user, 'token' => $token, 'success' => true], 200);
            } else {
                // Authentication failed
                return response()->json(['error' => 'Invalid credentials', 'success' => false], 401);
            }
        } catch (\Exception $e) {
            // Handle exceptions
            return response()->json(['error' => 'Something went wrong.', 'success' => false], 500);
        }
    }


    public function logout(Request $request)
    {
        try {
            // Get the authenticated user
            $user = Auth::user();

            if ($user) {
                // Revoke all tokens for the user
                $user->tokens()->delete();

                return response()->json(['message' => 'Logged out successfully', 'success' => true], 200);
            } else {
                return response()->json(['error' => 'User not authenticated', 'success' => false], 401);
            }
        } catch (\Exception $e) {
            // Handle exceptions
            return response()->json(['error' => 'Something went wrong.', 'success' => false], 500);
        }
    }



}
