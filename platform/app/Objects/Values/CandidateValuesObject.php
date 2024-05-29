<?php

declare(strict_types=1);

namespace App\Objects\Values;

use App\Http\Requests\UpdateCandidateRequest;
use App\Models\Mission;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Collection as SupportCollection;
use JsonSerializable;
use Override;

final class CandidateValuesObject implements JsonSerializable
{
    /**
     * @param  SupportCollection<int, array{value: int, label: string}>  $options
     * @param  array<int>|EloquentCollection<int, Mission>  $missions
     */
    public function __construct(public string $firstName, public string $lastName, public string $email, public Carbon $birthday, public SupportCollection $options, public array|EloquentCollection $missions)
    {
        $this->constructMissions();
    }

    public static function make(UpdateCandidateRequest $request): self
    {
        return new self(
            firstName: $request->string('first_name')->toString(),
            lastName: $request->string('last_name')->toString(),
            email: $request->string('email')->toString(),
            birthday: new Carbon(
                time: $request->string('birthday')->toString()
            ),
            options: $request->collect('options'),
            missions: []
        );
    }

    /**
     * @return array{first_name: string, last_name: string, email: string}
     */
    #[Override]
    public function jsonSerialize(): array
    {
        return [
            'first_name' => $this->getFirstName(),
            'last_name' => $this->getLastName(),
            'email' => $this->getEmail(),
            'birthday' => $this->getBirthday(),
        ];
    }

    public function constructMissions(): void
    {
        $this->missions = Mission::query()->findMany(
            $this->getOptions()->map(function ($option) {
                return $option['value'];
            }));
    }

    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function getLastName(): string
    {
        return $this->lastName;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getBirthday(): Carbon
    {
        return $this->birthday;
    }

    /**
     * @return SupportCollection<int, array{value: int, label: string}>
     */
    public function getOptions(): SupportCollection
    {
        return $this->options;
    }

    /**
     * @return array<int>|EloquentCollection<int, Mission>
     */
    public function getMissions(): array|EloquentCollection
    {
        return $this->missions;
    }
}
