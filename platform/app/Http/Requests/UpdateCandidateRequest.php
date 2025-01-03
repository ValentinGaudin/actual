<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Rules\NirRule;
use Illuminate\Foundation\Http\FormRequest;

final class UpdateCandidateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'email' => ['required', 'email'],
            'birthday' => ['required', 'string'],
            'nir' => ['required', 'string', 'max:15', new NirRule],
            'options' => ['array'],
        ];
    }
}
