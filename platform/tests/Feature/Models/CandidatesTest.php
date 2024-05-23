<?php

declare(strict_types=1);

namespace Tests\Feature\Models;

use App\Models\Candidate;
use Illuminate\Support\Carbon;

describe('Candidate model', function () {
    it('has correct fillable properties', function () {
        $candidate = new Candidate;

        expect($candidate->getFillable())
            ->toEqual(['first_name', 'last_name', 'email', 'birthday']);
    });

    it('casts properties correctly', function () {
        $candidate = Candidate::factory()->create();

        expect($candidate)->toBeInstanceOf(Candidate::class)
            ->and($candidate->birthday)->toBeInstanceOf(Carbon::class)
            ->and($candidate->created_at)->toBeInstanceOf(Carbon::class)
            ->and($candidate->updated_at)->toBeInstanceOf(Carbon::class);
    });

    it('generates full_name attribute correctly', function () {
        $candidate = new Candidate([
            'first_name' => 'John',
            'last_name' => 'Doe',
        ]);

        expect($candidate->full_name)->toEqual('Doe John');
    });

    it('creates a candidate and verifies full_name', function () {
        $candidate = Candidate::query()->create([
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'email' => 'jane.doe@example.com',
            'birthday' => '1985-05-15',
        ]);

        expect($candidate)->toBeInstanceOf(Candidate::class)
            ->and($candidate->full_name)->toEqual('Doe Jane')
            ->and($candidate->email)->toEqual('jane.doe@example.com')
            ->and($candidate->birthday->format('Y-m-d'))->toEqual('1985-05-15');
    });
});
