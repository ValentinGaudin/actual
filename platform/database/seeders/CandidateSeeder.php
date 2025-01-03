<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Candidate;
use App\Models\Mission;
use Illuminate\Database\Seeder;

final class CandidateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Candidate::factory()
            ->has(Mission::factory()->count(1))
            ->count(10)
            ->create();
    }
}
