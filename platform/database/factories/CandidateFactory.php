<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Candidate>
 */
final class CandidateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'last_name' => fake()->lastName(),
            'first_name' => fake()->firstName(),
            'email' => fake()->unique()->safeEmail(),
            'nir' => $this->generateValidNIR(),
            'birthday' => fake()->date(),
        ];
    }

    private function generateValidNIR(): string
    {
        $sex = rand(1, 2);
        $year = mb_str_pad((string) rand(0, 99), 2, '0', STR_PAD_LEFT);
        $month = mb_str_pad((string) rand(1, 12), 2, '0', STR_PAD_LEFT);
        $department = mb_str_pad((string) rand(1, 95), 2, '0', STR_PAD_LEFT);
        $commune = mb_str_pad((string) rand(1, 999), 3, '0', STR_PAD_LEFT);
        $order = mb_str_pad((string) rand(1, 999), 3, '0', STR_PAD_LEFT);

        $base = $sex.$year.$month.$department.$commune.$order;
        $key = 97 - ($base % 97);

        return $base.mb_str_pad((string) $key, 2, '0', STR_PAD_LEFT);
    }
}
