<?php


use App\Http\Requests\UpdateCandidateRequest;
use App\Models\Mission;
use App\Objects\Values\CandidateValuesObject;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection as SupportCollection;

it('can be instantiated correctly', function () {
    $firstName = 'John';
    $lastName = 'Doe';
    $email = 'john.doe@example.com';
    $birthday = Carbon::parse('1990-01-01');
    $options = new SupportCollection([
        ['value' => 1, 'label' => 'Option 1'],
        ['value' => 2, 'label' => 'Option 2'],
    ]);

    $candidate = new CandidateValuesObject(
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        birthday: $birthday,
        options: $options,
        missions: []
    );

    expect($candidate->getFirstName())->toBe($firstName)
        ->and($candidate->getLastName())->toBe($lastName)
        ->and($candidate->getEmail())->toBe($email)
        ->and($candidate->getBirthday()->eq($birthday))->toBeTrue()
        ->and($candidate->getOptions())->toBe($options);
});

it('can be created from request', function () {
    $request = new UpdateCandidateRequest([
        'first_name' => 'Jane',
        'last_name' => 'Doe',
        'email' => 'jane.doe@example.com',
        'birthday' => '1992-02-02',
        'options' => [
            ['value' => 1, 'label' => 'Option 1'],
            ['value' => 2, 'label' => 'Option 2'],
        ],
    ]);

    $candidate = CandidateValuesObject::make($request);

    expect($candidate->getFirstName())->toBe('Jane')
        ->and($candidate->getLastName())->toBe('Doe')
        ->and($candidate->getEmail())->toBe('jane.doe@example.com')
        ->and($candidate->getBirthday()->eq(new Carbon('1992-02-02')))->toBeTrue();
});

it('can be serialized to JSON', function () {
    $candidate = new CandidateValuesObject(
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        birthday: Carbon::parse('1990-01-01'),
        options: new SupportCollection(),
        missions: []
    );

    $json = $candidate->jsonSerialize();

    expect($json)->toEqual([
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'john.doe@example.com',
        'birthday' => Carbon::parse('1990-01-01'),
    ]);
});

it('constructs missions correctly', function () {
    $missions = Mission::factory()->count(2)->create();

    $options = new SupportCollection([
        ['value' => $missions[0]->id, 'label' => 'Mission 1'],
        ['value' => $missions[1]->id, 'label' => 'Mission 2'],
    ]);

    $candidate = new CandidateValuesObject(
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        birthday: Carbon::parse('1990-01-01'),
        options: $options,
        missions: []
    );

    $candidate->constructMissions();

    expect($candidate->getMissions()->pluck('id'))->toEqual($missions->pluck('id'));
});