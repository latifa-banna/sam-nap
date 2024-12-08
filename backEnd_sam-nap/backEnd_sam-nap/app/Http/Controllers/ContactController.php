<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'phone'=>'required',
            'email' => 'required|email',
            'message' => 'required',
        ]);

        // Send email
        Mail::to('coursissetenglsh@gmail.com')->send(new ContactFormMail($data));

        return response()->json(['message' => 'Email sent successfully']);
    }
}
