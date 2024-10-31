<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\LogoutRequest;
use App\Models\User;
use Illuminate\Validation\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller {
    //

    public function login( LoginRequest $request ) {
        $data = $request->validated();

        if ( !Auth::attempt( $data ) ) {
            return response( [ 'message'=>'Provided Email address incorrect' ], '422' );
        }
        $user = Auth::user();

        $token = $request->user()->createToken( 'main' )->plainTextToken;

        return response( compact( 'user', 'token' ) );
    }

    public function signup( SignupRequest $request ) {

        $data = $request->validated();

        $user = User::create( [
            'name'=>$data[ 'name' ],
            'email'=>$data[ 'email' ],
            'password'=>$data[ 'password' ],
        ] );
        $token = $user->createToken( 'main' )->plainTextToken;

        return response()->json( [ 'msg'=>'Registered successfully' ] );
    }

    public function logout( LogoutRequest $request ) {
        $user = $request->User();
        $user->currentAccessToken()->delete();
        return response( 'Logout ', 204 );
    }
}
