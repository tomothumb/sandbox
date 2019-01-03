<?php

namespace App\Http\Controllers;

use App\Ip;
use App\Service\Whois\Parser\JpnicParser;
use App\Service\Whois\Parser\Parser;
use App\Service\Whois\WhoisService;
use Illuminate\Http\Request;
use IPv4\SubnetCalculator;
use phpWhois\Whois;

class IpController extends Controller
{

    public function index()
    {
        $WhoisService = new WhoisService( new JpnicParser() );

        $result = $WhoisService->lookup('117.103.185.0');
        $result = $WhoisService->lookup('117.103.184.4');
        $WhoisService->save($result);

        $ips = Ip::paginate(100);

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
        $WhoisService = new WhoisService( new JpnicParser() );

        $result = $WhoisService->lookup($ip_address);
        $WhoisService->save($result);

//        $ip = Ip::firstOrCreate([
//            'ip_from' => $ip_address
//        ]);
//        $ip->ip_from = $ip_address;
//            $ip->domain = $ip_address;
//            $ip->org = $ip_address;
//        $ip->save();
    }

}
