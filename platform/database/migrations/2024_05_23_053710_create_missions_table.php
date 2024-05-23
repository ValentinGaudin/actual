<?php

declare(strict_types=1);

use App\Models\Candidate;
use App\Models\Mission;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('missions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->timestamps();
        });

        Schema::create('candidate_mission', function (Blueprint $table) {
            $table->foreignIdFor(Candidate::class)->constrained();
            $table->foreignIdFor(Mission::class)->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidate_mission');
        Schema::dropIfExists('missions');
    }
};
