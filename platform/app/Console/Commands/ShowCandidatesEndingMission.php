<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Candidate;
use Carbon\Carbon;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;
use Symfony\Component\Console\Command\Command as CommandAlias;

use function Laravel\Prompts\error;
use function Laravel\Prompts\info;
use function Laravel\Prompts\intro;
use function Laravel\Prompts\text;

final class ShowCandidatesEndingMission extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:show-candidates-ending-mission {--date= : The date to check for ending missions (format: Y-m-d)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Display candidates finishing their mission on a given date';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        intro('Display candidates finishing their mission on a given date');

        $date = $this->option('date');

        if (! $date) {
            $date = text(
                label: 'Please enter the date (format: Y-m-d)',
                placeholder: Carbon::today()->startOfDay()->format('Y-m-d'),
                default: Carbon::today()->startOfDay()->format('Y-m-d'),
                hint: 'This is will be the search date for end mission date'
            );
        }

        try {
            Carbon::parse($date);
        } catch (Exception $e) {
            error('Invalid date format. Please use Y-m-d format.');

            return Command::INVALID;
        }

        $candidates = Candidate::query()
            ->whereHas('missions', function (Builder $query) use ($date) {
                $query
                    ->whereDate('end_date', $date);
            })
            ->get();

        if ($candidates->isEmpty()) {
            info('No candidates finishing their mission on '.$date);

            return Command::INVALID;
        }

        $headers = ['First Name', 'Last Name', 'Current Mission Title', 'Current Mission Start Date', 'Current Mission End Date'];

        $data = $candidates->map(function (Candidate $candidate) {
            $currentMission = $candidate->missions->first();

            if (! $currentMission) {
                error('No missions for candidate: '.$candidate->getKey());

                return Command::FAILURE;
            }

            return [
                $candidate->first_name,
                $candidate->last_name,
                $currentMission->title,
                $currentMission->start_date,
                $currentMission->end_date,
            ];
        });

        $this->table($headers, $data);

        return CommandAlias::SUCCESS;
    }
}
