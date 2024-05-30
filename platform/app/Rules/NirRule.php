<?php

declare(strict_types=1);

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

final class NirRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  Closure(string): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $value = str_replace(' ', '', is_string($value) ? $value : '');
        if ($value === '') {
            $fail("The :attribute canno't be empty");
        }

        if (! is_numeric($value) || mb_strlen($value) !== 15) {
            $fail('');
        }

        $base = mb_substr($value, 0, 13);
        $key = (int) mb_substr($value, -2);

        if ((97 - ($base % 97)) !== $key) {
            $fail('The :attribute is not a valid NIR');
        }
    }
}
