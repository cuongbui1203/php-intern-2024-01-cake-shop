<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateCakeIngredientPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cake_ingredient', function (Blueprint $table) {
            $table->foreign('cake_id')
                ->references('id')
                ->on('cakes')
                ->cascadeOnDelete();
            $table->foreign('ingredient_id')
                ->references('id')
                ->on('ingredients')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cake_ingredient', function (Blueprint $table) {
            $table->dropConstrainedForeignId('cake_id');
            $table->dropConstrainedForeignId('ingredient_id');
        });
    }
}
