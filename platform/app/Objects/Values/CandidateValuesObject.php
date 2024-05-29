<?php

declare(strict_types=1);

namespace App\Objects\Values;

use App\Http\Requests\UpdateCandidateRequest;
use App\Models\Mission;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use JsonSerializable;
use Override;

final class CandidateValuesObject implements JsonSerializable
{
    /**
     * @param  Collection<int, array{value: int, label: string}>  $missions
     */
    public function __construct(public string $firstName, public string $lastName, public string $email, public Carbon $birthday, public Collection $missions)
    {
        $this->missions = $this->constructMissions();
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
            missions: $request->collect('missions')
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
            'missions' => $this->getMissions(),
        ];
    }

    public function constructMissions()
    {
        return Mission::query()->findMany(
            $this->getMissions()->map(function ($mission) {
                return $mission['value'];
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
     * @return Collection<int, array{value: int, label: string}>
     */
    public function getMissions(): Collection
    {
        return $this->missions;
    }
}
