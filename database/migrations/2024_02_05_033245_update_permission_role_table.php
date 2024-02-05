<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdatePermissionRoleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        // Schema::rename('permission_role', 'role_permission');

        Schema::rename('role_permission', 'permission_role');
        Schema::table('permission_role', function (Blueprint $table) {
            $table->foreign('permission_id')
                ->references('id')
                ->on('permissions')
                ->cascadeOnDelete();
            $table->foreign('role_id')
                ->references('id')
                ->on('roles')
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
        //
        Schema::table('permission_role', function (Blueprint $table) {
            $table->dropConstrainedForeignId('permission_id');
            $table->dropConstrainedForeignId('role_id');
        });
        Schema::rename('permission_role', 'role_permission');
    }
}
