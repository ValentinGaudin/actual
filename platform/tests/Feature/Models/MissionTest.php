<?php

declare(strict_types=1);

use App\Models\Mission;
use Illuminate\Support\Carbon;

describe('Mission model', function () {
    it('has correct fillable properties', function () {
        $mission = new Mission;
        expect($mission->getFillable())
            ->toEqual(['title', 'start_date', 'end_date']);
    });

    it('casts properties correctly', function () {
        $mission = Mission::factory()->create();

        expect($mission)->toBeInstanceOf(Mission::class)
            ->and($mission->title)->toBeString()
            ->and($mission->start_date)->toBeInstanceOf(Carbon::class)
            ->and($mission->end_date)->toBeInstanceOf(Carbon::class);
    });

    it('creates a user and verifies properties', function () {
        $now = Carbon::now();
        $end = $now->addYears(10);

        $mission = Mission::query()->create([
            'title' => 'Développeur fullStack',
            'start_date' => $now,
            'end_date' => $end,
        ]);

        expect($mission)->toBeInstanceOf(Mission::class)
            ->title->toEqual('Développeur fullStack')
            ->start_date->toEqualWithDelta($now, 1)
            ->end_date->toEqualWithDelta($end, 1);
    });
});
