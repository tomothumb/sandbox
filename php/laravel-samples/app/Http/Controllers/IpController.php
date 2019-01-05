<?php

namespace App\Http\Controllers;

use App\Ip;
use App\Service\Whois\WhoisService;
use Illuminate\Http\Request;

class IpController extends Controller
{

    public function index()
    {
        $ips = Ip::paginate(500);
        return view('ip.list', compact('ips'));
    }

    public function form()
    {
        return view('ip.new');
    }

    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'ip_address' => 'required|ip'
        ]);

        if ($validatedData) {
            $ip_address = $request->ip_address;
            if(! WhoisService::hasIp($ip_address)){
                WhoisService::addIp($ip_address);
            }
        }
        return redirect('/ip/');
    }

    public function detail($id)
    {
        $ip = Ip::findOrFail($id);
        return view('ip.detail', compact('ip'));
    }

    public function update(Request $request)
    {
        return redirect('/ip/');
    }

    public function delete($id)
    {
        Ip::destroy($id);
        return redirect('/ip/');
    }

}
