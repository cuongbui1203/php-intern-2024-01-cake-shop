<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTimestamps extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cakes', function (Blueprint $table) {
            $table->timestamps();
        });
        Schema::table('cake_types', function (Blueprint $table) {
            $table->timestamps();
        });
        Schema::table('orders', function (Blueprint $table) {
            $table->timestamp('updated_at')->nullable();
        });
        Schema::table('order_details', function (Blueprint $table) {
            $table->timestamps();
        });
        Schema::table('roles', function (Blueprint $table) {
            $table->timestamps();
        });
        Schema::table('permissions', function (Blueprint $table) {
            $table->timestamps();
        });
        Schema::table('statuses', function (Blueprint $table) {
            $table->timestamps();
        });
        Schema::table('ingredients', function (Blueprint $table) {
            $table->timestamps();
        });
        Schema::table('pictures', function (Blueprint $table) {
            $table->timestamps();
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
            $table->dropColumn('created_at');
            $table->dropColumn('updated_at');
        });
        Schema::table('cake_types', function (Blueprint $table) {
            $table->dropColumn('created_at');
            $table->dropColumn('updated_at');
        });
        Schema::table('order_details', function (Blueprint $table) {
            $table->dropColumn('created_at');
            $table->dropColumn('updated_at');
        });
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('updated_at');
        });
        Schema::table('roles', function (Blueprint $table) {
            $table->dropColumn('created_at');
            $table->dropColumn('updated_at');
        });
        Schema::table('permissions', function (Blueprint $table) {
            $table->dropColumn('created_at');
            $table->dropColumn('updated_at');
        });
        Schema::table('statuses', function (Blueprint $table) {
            $table->dropColumn('created_at');
            $table->dropColumn('updated_at');
        });
        Schema::table('ingredients', function (Blueprint $table) {
            $table->dropColumn('created_at');
            $table->dropColumn('updated_at');
        });
        Schema::table('pictures', function (Blueprint $table) {
            $table->dropColumn('created_at');
            $table->dropColumn('updated_at');
        });
    }
}
