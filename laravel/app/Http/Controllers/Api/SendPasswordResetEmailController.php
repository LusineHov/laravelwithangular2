<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;

class SendPasswordResetEmailController extends Controller
{
    public function sendemail(Request $request) {

         $this->validate($request, ['email' => 'required|email']);

        $response = $this->broker()->sendResetLink(
            $request->only('email'), $this->resetNotifier()
        );

        if ($response === Password::RESET_LINK_SENT) {
            return response()->json(['successMessage'=>"We have e-mailed your password reset link!"],201);
        }

        return response()->json(["message"=>"We can't find a user with that e-mail address."]);
    }

    protected function resetNotifier()
    {
        //
    }

    public function broker()
    {
        return Password::broker();
    }
}