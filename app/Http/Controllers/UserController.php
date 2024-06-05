<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;

use Cassandra\Exception\ValidationException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function index()
    {
        $data = User::all();
        return response()->json($data);
    }

    public function create()
    {


    }
    public function getUserWithPostsAndComments()
    {


        try {
            $posts = Post::with('user', 'comments.user')->get();
            return response()->json([ 'data' => $posts], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function saveUser(Request $request)
    {
        try {
            // Validate the request data
            $request->validate([
                'email' => 'required|email|unique:user_data',
                'phone_number' => 'required|string|unique:user_data,phone_number',
            ]);

            // If validation passes, proceed with creating the user
            $validatedData = $request->only(['first_name', 'last_name', 'date_of_birth', 'phone_number', 'email', 'password']);

            // Hash the password
            $validatedData['password'] = Hash::make($validatedData['password']);

            // Check if profile_picture is present in the request
            if ($request->hasFile('profile_picture')) {
                $file = $request->file('profile_picture');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('uploads'), $fileName);
                $validatedData['profile_picture'] = '/uploads/' . $fileName;
            }

            // Create a new user with the validated data
            $user = User::create($validatedData);


            // Return a success response
            return response()->json(['user' => $user], 201);
        } catch (QueryException $e) {
            // Check if the exception is due to duplicate entry for email
            if ($e->errorInfo[1] == 1062) {
                return response()->json(['error' => 'Email address already exists.'], 422);
            }

            // For other database-related errors, return a generic error message
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);       } catch (ValidationException $e) {
            // If the email is not unique, return a JSON response with the error message
            if ($e->validator->errors()->has('email')) {
                return response()->json(['error' => $e->validator->errors()->first('email')], 422);
            }

            // For other validation errors, return a JSON response with all error messages
            return response()->json(['error' => $e->validator->errors()->all()], 422);
        }
    }
    public function show($id)
    {

    }
    public function AddPost(Request $request){




    }

    public function edit($id)
    {

    }


    public function update(Request $request, $id)
    {

    }


    public function destroy($id)
    {
    }
}
