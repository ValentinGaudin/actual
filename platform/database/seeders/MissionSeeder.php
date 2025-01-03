<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Mission;
use Illuminate\Database\Seeder;

final class MissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Mission::factory()->count(10)->create();
    }
}
