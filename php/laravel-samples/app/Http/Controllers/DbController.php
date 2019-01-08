<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Backup\Helpers\Format;
use Spatie\Backup\Tasks\Monitor\BackupDestinationStatus;
use Spatie\Backup\Tasks\Monitor\BackupDestinationStatusFactory;

class DbController extends Controller
{
    public function getList(){
        $statuses = BackupDestinationStatusFactory::createForMonitorConfig(config('backup.monitorBackups'));
        $rows = $statuses->map(function (BackupDestinationStatus $backupDestinationStatus) {
            $row = [
                $backupDestinationStatus->backupName(),
                $backupDestinationStatus->diskName(),
                Format::emoji($backupDestinationStatus->isReachable()),
                Format::emoji($backupDestinationStatus->isHealthy()),
                'amount' => $backupDestinationStatus->amountOfBackups(),
                'newest' => $backupDestinationStatus->dateOfNewestBackup()
                    ? Format::ageInDays($backupDestinationStatus->dateOfNewestBackup())
                    : 'No backups present',
                'usedStorage' => $backupDestinationStatus->humanReadableUsedStorage(),
            ];
            return $row;
        });

//
        dd($rows);

//        $this->displayOverview($statuses);
//        $this->displayConnectionErrors($statuses);

        return 1;
    }
}
