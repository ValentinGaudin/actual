<?php

namespace App\Objects\Values;

use App\Http\Requests\UpdateCandidateRequest;
use Carbon\Carbon;
use JsonSerializable;
use Override;

class CandidateValuesObject  implements JsonSerializable
{
    public function __construct(public string $firstName, public string $lastName, public string $email, public string $birthday)
    {
    }

    /**
     * @param UpdateCandidateRequest $request
     *
     * @return CandidateValuesObject
     */
    public static function make(UpdateCandidateRequest $request): self
    {
        return new self(
            firstName: $request->string('first_name')->toString(),
            lastName: $request->string('last_name')->toString(),
            email: $request->string('email')->toString(),
            birthday: new Carbon(
                time: $request->string('birthday')->toString()
            ),
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
            'birthday' => $this->getBirthday()
        ];
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

    public function getBirthday(): string
    {
        return $this->birthday;
    }
}