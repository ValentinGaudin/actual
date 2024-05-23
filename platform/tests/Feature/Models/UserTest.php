<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

describe('User model', function () {
    it('has correct fillable properties', function () {
        $user = new User;
        expect($user->getFillable())->toEqual(['name', 'email', 'password']);
    });

    it('has correct hidden properties', function () {
        $user = new User;
        expect($user->getHidden())->toEqual(['password', 'remember_token']);
    });

    it('casts properties correctly', function () {
        $user = User::factory()->create();

        expect($user)->toBeInstanceOf(User::class)
            ->and($user->email_verified_at)->toBeInstanceOf(Carbon::class)
            ->and(Hash::check('password', $user->getAuthPassword()))->toBeTrue();
    });

    it('creates a user and verifies properties', function () {
        $user = User::query()->create([
            'name' => 'Jane Doe',
            'email' => 'jane.doe@example.com',
            'password' => 'secret',
        ]);

        expect($user)->toBeInstanceOf(User::class)
            ->and($user->name)->toEqual('Jane Doe')
            ->and($user->email)->toEqual('jane.doe@example.com')
            ->and(Hash::check('secret', $user->password))->toBeTrue();
    });
});
