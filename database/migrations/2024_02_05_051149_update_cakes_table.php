<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateCakesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cakes', function (Blueprint $table) {
            $table->foreign('type_id')
                ->references('id')
                ->on('cake_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cakes', function (Blueprint $table) {
            $table->dropConstrainedForeignId('type_id');
        });
    }
}
