<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

final class UserSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 0; $i < 2; $i++) {
            User::factory()
                ->afterCreating(function (User $user) use ($i) {
                    $user->update([
                        'email' => config('app.name').++$i.'@localhost.com',
                    ]);
                })
                ->create();
        }
    }
}
