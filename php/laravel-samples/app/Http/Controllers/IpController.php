<?php

namespace App\Http\Controllers;

use App\Ip;
use Illuminate\Http\Request;

class IpController extends Controller
{


    public function index()
    {
        $ips = Ip::paginate(100);
//        $ips = collect([]);


        return view('ip.list',compact('ips'));
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

        if($validatedData){
            $this->addIp($request->ip_address);
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

    private function addIp($ip_address){
        $ip = Ip::firstOrCreate([
            'ip_from' => $ip_address
        ]);
        $ip->ip_from = $ip_address;
//            $ip->domain = $ip_address;
//            $ip->org = $ip_address;
        $ip->save();
    }

}
