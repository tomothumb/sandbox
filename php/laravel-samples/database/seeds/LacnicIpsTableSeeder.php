<?php

use App\Service\Whois\IpUtil;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class LacnicIpsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // @refer https://www.nic.ad.jp/ja/dns/ap-addr-block.html
        // @refer https://www.nic.ad.jp/ja/dns/jp-addr-block.html
        // @refer https://github.com/matsumotory/Create-IP-List-from-JPNIC
        \DB::table("iprange_lacnic")->truncate();
        $file = new SplFileObject('database/csv/ipv4_lacnic.csv');
        $file->setFlags(
            \SplFileObject::READ_CSV |
            \SplFileObject::READ_AHEAD |
            \SplFileObject::SKIP_EMPTY |
            \SplFileObject::DROP_NEW_LINE
        );
        $list = [];
        $now = Carbon::now();
        foreach($file as $line) {
//            $list[] = [
//                "ip_from" => $line[0],
//                "ip_to" => $line[1],
//                "created_at" => $now
//            ];

            $list = [
                "ip_from" => IpUtil::ipv4ToInt($line[0]),
                "ip_to" => IpUtil::ipv4ToInt($line[1]),
                "created_at" => $now
            ];
            \DB::table("iprange_lacnic")->insert($list);
        }
//        \DB::table("iprange_apnic")->insert($list);
    }
}
